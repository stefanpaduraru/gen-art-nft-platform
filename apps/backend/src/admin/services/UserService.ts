import {
  ExtendedProject,
  ProjectTypes,
  Project,
} from '@common/entities/Project';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { UserRepository } from '@common/repositories/UserRepository';
import * as Bluebird from 'bluebird';
import { NotFoundError } from 'routing-controllers';
import TokenService from './TokenService';

class UserServiceImpl {
  public getAllActive() {
    return UserRepository.findManyWhere(
      'user.active = :active',
      {
        active: true,
      },
      [
        ['user.project', 'project'],
        ['user.partner', 'partner'],
      ],
    );
  }

  public async getUserDetails(id: number) {
    const user = await UserRepository.findOneWhere(
      'user.id = :id',
      { id },
      [['user.partner', 'partner']],
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const templates = await ProjectRepository.findManyWhere(
      'user.id = :userId AND project.type = :type',
      { userId: user?.id, type: ProjectTypes.Template },
      [
        ['project.collection', 'collection'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    );

    await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        this.findAndInjectChainProjects(template),
      { concurrency: 1 },
    );
    user.project = templates;

    return user;
  }

  async findAndInjectChainProjects(template: Project) {
    const project = template as ExtendedProject;

    const testnetProject =
      await ProjectRepository.findTestnetProjectByTemplateId(
        template.id,
      );
    project.testnetProject = testnetProject;

    const mainnetProject =
      await ProjectRepository.findMainnetProjectByTemplateId(
        template.id,
      );
    project.mainnetProject = mainnetProject;
    return project;
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
}

const UserService = new UserServiceImpl();
export default UserService;
