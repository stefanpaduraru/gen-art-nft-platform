import { Connection, EntityManager } from 'typeorm';
import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { IdIndexable } from '@common/interfaces/IdIndexable';
import {
  Project,
  ProjectType,
  ProjectTypes,
} from '@common/entities/Project';

class ProjectRepositoryImpl extends AbstractRepository<Project> {
  public async findById(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable) | undefined> {
    const project = await this.findWithRelations(id, [], executor);

    if (!project) {
      return;
    }

    return project;
  }

  public async findActiveProjects(
    active: boolean = true,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable)[] | undefined> {
    const projects = this.findManyWhere(
      'active = :active',
      { active },
      [],
      executor,
    );
    if (!projects) {
      return;
    }

    return projects;
  }

  public async findAllProjects(
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable)[]> {
    const projects = this.findManyWhere(
      '',
      {},
      [
        ['project.collection', 'collection'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      executor,
    );
    if (!projects) {
      return [];
    }

    return projects;
  }

  public async findAllTemplates(
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable)[]> {
    const projects = this.findManyWhere(
      'project.type = :type',
      { type: ProjectTypes.Template },
      [
        ['project.collection', 'collection'],
        ['project.token', 'token'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.transferRequests', 'transferRequest'],
        ['project.user', 'user'],
      ],
      executor,
    );
    if (!projects) {
      return [];
    }

    return projects;
  }

  public async findTestnetProjectByTemplateId(
    templateId: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable) | undefined> {
    const project = await this.findOneWhere(
      'project.type = :type AND templateId = :templateId',
      { type: ProjectTypes.Testnet, templateId },
      [
        ['project.collection', 'collection'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      executor,
    );

    if (!project) {
      return;
    }

    return project;
  }

  public async findMainnetProjectByTemplateId(
    templateId: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Project & IdIndexable) | undefined> {
    const project = this.findOneWhere(
      'project.type = :type AND templateId = :templateId',
      { type: ProjectTypes.Mainnet, templateId },
      [
        ['project.collection', 'collection'],
        ['project.features', 'features'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
      executor,
    );
    if (!project) {
      return;
    }

    return project;
  }

  public getProjectCount(
    projectType: ProjectType,
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .leftJoinAndSelectMany([])
      .where('project.type = :projectType', { projectType })
      .getCount();
  }
}

export const ProjectRepository = new ProjectRepositoryImpl(
  Project,
  'project',
);
