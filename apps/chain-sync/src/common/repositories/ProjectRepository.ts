import { Connection, EntityManager } from "typeorm";
import { AbstractRepository } from "@common/repositories/shared/AbstractRepository";
import { IdIndexable } from "@common/interfaces/IdIndexable";
import { Project } from "@common/entities/Project";

class ProjectRepositoryImpl extends AbstractRepository<Project> {
  public async findById(
    id: number,
    executor: EntityManager | Connection = this.connection
  ): Promise<(Project & IdIndexable) | undefined> {
    const project = await this.findWithRelations(id, [], executor);

    if (!project) {
      return;
    }

    return project;
  }

  public async findActiveProjects(
    active: boolean = true,
    executor: EntityManager | Connection = this.connection
  ): Promise<(Project & IdIndexable)[] | undefined> {
    const projects = this.findManyWhere(
      "active = :active",
      { active },
      [],
      executor
    );
    if (!projects) {
      return;
    }

    return projects;
  }
}

export const ProjectRepository = new ProjectRepositoryImpl(Project, "project");
