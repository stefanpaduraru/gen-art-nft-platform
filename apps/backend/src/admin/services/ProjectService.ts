import UserService from '@app/services/UserService';
import {
  ExtendedProject,
  Project,
  ProjectTypes,
} from '@common/entities/Project';
import {
  TransferRequest,
  TransferStateTypes,
} from '@common/entities/TransferRequest';
import { toChecksumAddress } from 'ethereum-checksum-address';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { TransferRequestRepository } from '@common/repositories/TransferRequestRepository';
import { UserRepository } from '@common/repositories/UserRepository';
import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import * as Bluebird from 'bluebird';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import CollectionService from './CollectionService';
import ContractService from './ContractService';
import TokenService from './TokenService';

class ProjectServiceImpl {
  public async getProjects() {
    const templates = await ProjectRepository.findAllTemplates();

    const projects: ExtendedProject[] = await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        this.findAndInjectChainProjects(template),
      { concurrency: 1 },
    );

    return projects;
  }

  async findAndInjectChainProjects(
    template: Project,
    injectTokens: boolean = false,
  ) {
    const project = template as ExtendedProject;

    const testnetProject =
      await ProjectRepository.findTestnetProjectByTemplateId(
        template.id,
      );
    project.testnetProject = testnetProject;
    if (testnetProject && injectTokens) {
      await this.findAndInjectProjectTokens(testnetProject);
    }

    const mainnetProject =
      await ProjectRepository.findMainnetProjectByTemplateId(
        template.id,
      );
    if (mainnetProject && injectTokens) {
      await this.findAndInjectProjectTokens(mainnetProject);
    }
    project.mainnetProject = mainnetProject;
    return project;
  }

  public async getProjectDetails(id: number) {
    const where = 'project.id = :projectId';

    const project = await ProjectRepository.findOneWhere(
      where,
      { projectId: id },
      [
        ['project.collection', 'collection'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.transferRequests', 'transferRequest'],
        ['project.user', 'user'],
        ['project.token', 'token'],
      ],
    );
    if (!project) return;

    return this.findAndInjectChainProjects(project, true);
  }

  public async getProjectsByArtistAddress(address: string) {
    const user = await UserRepository.findByAddress(address);

    return ProjectRepository.findManyWhere(
      'user.id = :userId',
      { userId: user?.id },
      [
        ['project.collection', 'collection'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    );
  }

  public async getProjectsByPartnerId(partnerId: number) {
    return ProjectRepository.findManyWhere(
      'partner.id = :partnerId',
      { partnerId },
      [
        ['project.collection', 'collection'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    );
  }

  public async getProjectsByContractId(contractId: number) {
    return ProjectRepository.findManyWhere(
      'contract.id = :contractId',
      { contractId },
      [
        ['project.collection', 'collection'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    );
  }

  public async updateProject(id: number, data: Partial<Project>) {
    return ProjectRepository.updateOne(id, data);
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

  public async createProjectTemplate(data: {
    name: string;
    gallery: MintoriaGallery;
    artistAddress: string;
  }) {
    const user = await UserService.getUserByAddress(
      toChecksumAddress(data.artistAddress),
    );

    if (!user) {
      throw new NotFoundError("Couldn't find user");
    }
    const collection = await CollectionService.getSelected();

    if (!collection) {
      throw new NotFoundError("Couldn't find Selected gallery");
    }
    const contract =
      data.gallery === MintoriaGalleries.Selected
        ? await ContractService.getMintoriaSelected()
        : await ContractService.getMintoriaOpenworld();

    if (!contract) {
      throw new NotFoundError(
        `Couldn't find contract for ${data.gallery}`,
      );
    }
    const newProject = {
      name: data.name,
      contract,
      collection,
      type: ProjectTypes.Template,
    };
    const project = { ...newProject, user };
    return ProjectRepository.createOne(project);
  }

  public async addProjectMainnetId(
    projectId: number,
    chainId: number,
  ) {
    const project = await this.getProjectDetails(projectId);
    if (!project) {
      return;
    }
    if (!project.mainnetProject) {
      // insert
      const mainnetProject = {
        ...(project.testnetProject as Project),
        templateId: projectId,
        chainId,
        contract: project.contract,
        collection: project.collection,
        type: ProjectTypes.Mainnet,
        createdAt: new Date(),
      } as Project;

      return ProjectRepository.createOne(mainnetProject);
    } else {
      throw new BadRequestError(
        'Project already has a mainnet id attached',
      );
    }
  }

  public async addProjectTestnetId(
    projectId: number,
    chainId: number,
  ) {
    const project = await this.getProjectDetails(projectId);
    if (!project) {
      return;
    }
    if (!project.testnetProject) {
      const testnetProject = {
        ...(project as Project),
        templateId: projectId,
        chainId,
        contract: project.contract,
        collection: project.collection,
        type: ProjectTypes.Testnet,
      } as Project;

      return ProjectRepository.createOne(testnetProject);
    } else {
      throw new BadRequestError(
        'Project already has a testnet id attached',
      );
    }
  }

  public async updateTransferRequest(
    requestId: number,
    state: TransferStateTypes,
    comments: string,
  ) {
    const transferRequest = {
      id: requestId,
      state,
      comments,
    } as TransferRequest;
    return TransferRequestRepository.updateOne(
      requestId,
      transferRequest,
    );
  }

  public async getProjectCount(type: ProjectTypes) {
    return ProjectRepository.getProjectCount(type);
  }
}

const ProjectService = new ProjectServiceImpl();
export default ProjectService;
