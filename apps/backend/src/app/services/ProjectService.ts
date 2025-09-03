import { Contract } from '@common/entities/Contract';
import {
  ExtendedProject,
  Project,
  ProjectSettings,
  ProjectTypes,
} from '@common/entities/Project';
import {
  TransferRequest,
  TransferStateTypes,
  TransferTypes,
} from '@common/entities/TransferRequest';
import { User } from '@common/entities/User';
import { ContractRepository } from '@common/repositories/ContractRepository';
import { FeatureRepository } from '@common/repositories/FeatureRepository';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { TransferRequestRepository } from '@common/repositories/TransferRequestRepository';
import { UserRepository } from '@common/repositories/UserRepository';
import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import { Network, Networks } from '@common/types/Network';
import * as Bluebird from 'bluebird';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from 'routing-controllers';
import CollectionService from './CollectionService';
import ContractService from './ContractService';
import TokenService from './TokenService';
import * as config from '@config/config';
import RecaptchaService from './RecaptchaService';
import { CaptchaActions } from '@common/types/CaptchaActions';
import { TokenRepository } from '@common/repositories/TokenRepository';

type NewProjectData = {
  name: string;
  pricePerTokenInWei: string;
  gallery: MintoriaGallery;
};

class ProjectServiceImpl {
  public async getProjects() {
    const templates = await ProjectRepository.findAllProjects();

    const projects = await Bluebird.Promise.map(
      templates,
      (template: Project) => this.injectChainProjects(template),
      { concurrency: 1 },
    );
    return projects;
  }

  async injectChainProjects(template: Project) {
    const testnetProject =
      await ProjectRepository.findTestnetProjectByTemplateId(
        template.id,
      );
    const project = template as ExtendedProject;
    project.testnetProject = testnetProject;
    return testnetProject;
  }

  public async getGalleryProjects(gallery: MintoriaGallery) {
    const projects = await ProjectRepository.findAndSortManyWhere(
      'contract.name = :contract AND project.active = 1 AND project.type = :projectType',
      {
        contract:
          gallery === MintoriaGalleries.Selected
            ? 'Mintoria Selected'
            : 'Mintoria Open World',
        projectType: ProjectTypes.Mainnet,
      },
      [
        ['project.collection', 'collection'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      { column: 'project.createdAt', direction: 'DESC' },
    );

    const tokens = await Bluebird.Promise.map(
      projects,
      (project: Project) => this.findFirstToken(project),
      { concurrency: 1 },
    );

    const projectsWithToken = projects.map((project, idx) => {
      const currentToken = tokens[idx];
      if (currentToken) {
        project.token = [currentToken];
      }
      return project;
    });

    return projectsWithToken;
  }

  public async getProjectDetails(
    id: number,
    network: Network,
    gallery?: MintoriaGallery,
  ) {
    let where = '';
    if (network === Networks.Mainnet) {
      where = `project.chainId = :id AND project.type = '${ProjectTypes.Mainnet}'`;
    } else if (network === Networks.Testnet) {
      where = `project.chainId = :id AND project.type = '${ProjectTypes.Testnet}'`;
    } else {
      where = 'project.id = :id';
    }
    if (gallery === MintoriaGalleries.Selected) {
      where += ' AND contract.name = "Mintoria Selected"';
    } else if (gallery === MintoriaGalleries.OpenWorld) {
      where += ' AND contract.name = "Mintoria Open World"';
    }
    const project = (await ProjectRepository.findOneWhere(
      where,
      { id },
      [
        ['project.collection', 'collection'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    )) as Project & { minterContract: Contract };

    if (project?.contract?.minterContractId) {
      const minterContract = await ContractRepository.findById(
        project?.contract?.minterContractId,
      );
      if (minterContract) {
        project.minterContract = minterContract;
      }

      await this.findAndInjectProjectTokens(project);
    }

    return project;
  }

  public async getMyProjectDetails(
    id: number,
    user: User,
  ): Promise<ExtendedProject | undefined> {
    const template = (await ProjectRepository.findOneWhere(
      'project.id = :id AND user.id = :userId',
      { id, userId: user.id },
      [
        ['project.collection', 'collection'],
        ['project.transferRequests', 'transferRequest'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    )) as Project & { minterContract: Contract };

    if (template?.contract?.minterContractId) {
      const minterContract = await ContractRepository.findById(
        template?.contract?.minterContractId,
      );
      if (minterContract) {
        template.minterContract = minterContract;
      }
    }
    await this.findAndInjectChainProjects(template);
    await this.findAndInjectProjectTokens(template);

    if (!template) {
      return;
    }
    return template;
  }

  public async getMainnetProjectsByUser(id: number) {
    const projects = await ProjectRepository.findAndSortManyWhere(
      'user.id = :userId AND project.type = :type',
      { userId: id, type: ProjectTypes.Mainnet },
      [
        ['project.collection', 'collection'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      { column: 'project.createdAt', direction: 'DESC' },
    );

    await Bluebird.Promise.map(
      projects,
      async (mainnetProject: Project) => {
        const token = await TokenRepository.getFeaturedTokenByProject(
          mainnetProject,
        );
        if (token) {
          mainnetProject.token = [token];
        }
        return mainnetProject;
      },
      { concurrency: 1 },
    );

    return projects;
  }

  public async getProjectsByArtistAddress(address: string) {
    const user = await UserRepository.findByAddress(address);

    const templates = await ProjectRepository.findAndSortManyWhere(
      'user.id = :userId AND project.type = :type',
      { userId: user?.id, type: ProjectTypes.Template },
      [
        ['project.collection', 'collection'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      { column: 'project.createdAt', direction: 'DESC' },
    );

    await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        this.findAndInjectChainProjects(template),
      { concurrency: 1 },
    );

    await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        this.findAndInjectProjectTokens(template),
      { concurrency: 1 },
    );

    return templates;
  }

  async findAndInjectProjectTokens(template: Project) {
    const project = template as ExtendedProject;
    const chainProject =
      project.mainnetProject || project.testnetProject || project;

    const tokens =
      await TokenService.getAllTokensByTemplateChainProjectId(
        chainProject.id,
      );

    template.token = tokens;
    return template;
  }

  async findAndInjectChainProjects(template: Project) {
    const project = template as ExtendedProject;

    const testnetProject =
      await ProjectRepository.findTestnetProjectByTemplateId(
        template.id,
      );
    if (testnetProject) {
      const token = await this.findFirstToken(testnetProject);
      if (token) {
        testnetProject.token = [token];
      }
    }
    project.testnetProject = testnetProject;

    const mainnetProject =
      await ProjectRepository.findMainnetProjectByTemplateId(
        template.id,
      );
    if (mainnetProject) {
      const token = await this.findFirstToken(mainnetProject);
      if (token) {
        mainnetProject.token = [token];
      }
    }
    //mainnetProject && this.findAndInjectProjectTokens(mainnetProject);
    project.mainnetProject = mainnetProject;
    return project;
  }

  findFirstToken(project: Project) {
    return TokenRepository.getFeaturedTokenByProject(project);
  }

  public async updateProjectSettingsForArtist(
    id: number,
    data: ProjectSettings,
    artist: User,
    captchaChallenge: string,
  ) {
    const verified = await RecaptchaService.verify(
      captchaChallenge,
      CaptchaActions.UpdateProject,
    );
    if (!verified) {
      throw new UnauthorizedError('Captcha verification failed.');
    }

    const existingProject = await ProjectRepository.findOneWhere(
      'project.id = :projectId AND user.id = :userId',
      {
        projectId: id,
        userId: artist.id,
      },
      [['project.user', 'user']],
    );
    if (!existingProject) {
      throw new NotFoundError();
    }

    await ProjectRepository.updateOne(id, data);
    return this.getMyProjectDetails(existingProject.id, artist);
  }

  public async updateProjectForArtist(
    id: number,
    data: Partial<Project>,
    artist: User,
    captchaChallenge: string,
  ) {
    const verified = await RecaptchaService.verify(
      captchaChallenge,
      CaptchaActions.UpdateProject,
    );
    if (!verified) {
      throw new UnauthorizedError('Captcha verification failed.');
    }

    const { features, ...project } = data;
    const existingProject = await ProjectRepository.findOneWhere(
      'project.id = :projectId AND user.id = :userId',
      {
        projectId: id,
        userId: artist.id,
      },
      [
        ['project.user', 'user'],
        ['project.features', 'features'],
      ],
    );
    if (!existingProject) {
      throw new NotFoundError();
    }

    // process features
    const featuresToAdd = (features || [])
      ?.filter((feature) => !feature.id)
      .map((feature) => ({ ...feature, project: existingProject }));
    if (featuresToAdd.length) {
      FeatureRepository.insertMany(featuresToAdd);
    }
    const featuresToRemove = (existingProject.features || [])
      ?.filter(
        (existingFeature) =>
          existingFeature.id &&
          !(features || []).find(
            (feature) => feature.id === existingFeature.id,
          ),
      )
      .map((feature) => ({ ...feature, isDeleted: true }));

    if (featuresToRemove) {
      FeatureRepository.updateMany(featuresToRemove);
    }

    await ProjectRepository.updateOne(id, project);
    return this.getMyProjectDetails(existingProject.id, artist);
  }

  public async createProjectForArtist(
    data: NewProjectData,
    user: User,
    captchaChallenge: string,
  ) {
    const verified = await RecaptchaService.verify(
      captchaChallenge,
      CaptchaActions.NewProject,
    );
    if (!verified) {
      throw new UnauthorizedError('Captcha verification failed.');
    }
    // get current number of template
    const templates = await ProjectRepository.findManyWhere(
      'project.userId = :userId AND project.type= :type', // AND project.active = :active
      { userId: user.id, active: 1, type: ProjectTypes.Template },
    );
    const maxProjectsAllowed = parseInt(
      config.MAX_NUMBER_OF_PROJECTS,
      10,
    );

    if (templates && templates.length >= maxProjectsAllowed) {
      throw new ForbiddenError(
        `Cannot have more than ${maxProjectsAllowed} projects running at the same time.`,
      );
    }

    const contract =
      data.gallery === MintoriaGalleries.Selected
        ? await ContractService.getMintoriaSelected()
        : await ContractService.getMintoriaOpenworld();

    const collection = await CollectionService.getSelected();
    const newProject = {
      name: data.name,
      pricePerTokenInWei: data.pricePerTokenInWei,
      type: ProjectTypes.Template,
      contract,
      user,
      collection,
    };
    const result = await ProjectRepository.createOne(newProject);
    if (result) {
      return this.getMyProjectDetails(result.id, user);
    }
    return;
  }

  public async addTransferRequest(
    projectId: number,
    user: User,
    captchaChallenge: string,
  ) {
    const verified = await RecaptchaService.verify(
      captchaChallenge,
      CaptchaActions.TransferProject,
    );
    if (!verified) {
      throw new UnauthorizedError('Captcha verification failed.');
    }

    const project = await this.getMyProjectDetails(projectId, user);
    const isTemplate =
      !project?.mainnetProject && !project?.testnetProject;
    const isTestnet =
      !!project?.testnetProject && !project?.mainnetProject;

    const existingRequest = (project?.transferRequests || []).find(
      (request) =>
        (isTemplate && !isTestnet
          ? request.type === TransferTypes.Testnet
          : request.type === TransferTypes.Mainnet) &&
        request.state === TransferStateTypes.Created,
    );
    if (existingRequest) {
      throw new BadRequestError(
        'A transfer request for this project already exists.',
      );
    }
    // insert
    const newRequest = {
      project,
      type: isTemplate
        ? TransferTypes.Testnet
        : TransferTypes.Mainnet,
      state: TransferStateTypes.Created,
    } as TransferRequest;
    return TransferRequestRepository.createOne(newRequest);
  }

  public async voteForProject(id: number, captchaChallenge: string) {
    const verified = await RecaptchaService.verify(
      captchaChallenge,
      CaptchaActions.Vote,
    );
    if (!verified) {
      throw new UnauthorizedError('Captcha verification failed.');
    }

    const project = await ProjectRepository.findById(id);
    if (!project) {
      throw new NotFoundError('Invalid project id');
    }
    const updatedProject = {
      ...project,
      votes: (project.votes || 0) + 1,
    };
    await ProjectRepository.updateOne(id, updatedProject);
    return ProjectRepository.findById(id);
  }
}

const ProjectService = new ProjectServiceImpl();
export default ProjectService;
