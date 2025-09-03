import { Connection, EntityManager } from 'typeorm';
import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { IdIndexable } from '@common/interfaces/IdIndexable';
import { Token } from '@common/entities/Token';
import { RelationObject } from '@common/repositories/shared/CustomQueryBuilder/CustomQueryBuilder.types';
import { Network, Networks } from '@common/types/Network';
import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import { Project, ExtendedProject } from '@common/entities/Project';

class TokenRepositoryImpl extends AbstractRepository<Token> {
  public async findById(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Token & IdIndexable) | undefined> {
    const token = await this.findWithRelations(id, [], executor);

    if (!token) {
      return;
    }

    return token;
  }

  public async findByTokenId(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Token & IdIndexable) | undefined> {
    const token = await this.findOneWhere(
      'token = :id',
      { id },
      [],
      executor,
    );

    if (!token) {
      return;
    }

    return token;
  }

  public async findByIdWithRelations(
    id: number,
    relations: RelationObject[],
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Token & IdIndexable) | undefined> {
    const token = await this.findWithRelations(
      id,
      relations,
      executor,
    );

    if (!token) {
      return;
    }

    return token;
  }

  public async findManyByProjectId(
    projectId: number,
    network: Network,
    gallery: MintoriaGallery,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Token & IdIndexable)[]> {
    let where = '';
    if (network === Networks.Mainnet) {
      where += 'project.mainnetId = :projectId';
      where += ' AND isTestnet = 0';
    } else {
      where += 'project.testnetId = :projectId';
      where += ' AND isTestnet = 1';
    }

    if (gallery === MintoriaGalleries.Selected) {
      where += ' AND contract.name = "Mintoria Selected"';
    } else {
      where += ' AND contract.name = "Mintoria Open World"';
    }

    const tokens = await this.findManyWhere(
      where,
      { projectId },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ],
      executor,
    );

    if (!tokens) {
      return [];
    }

    return tokens;
  }

  public getAllTokensByProjectCount(
    projectId: number,
    network: Network,
    gallery: MintoriaGallery,
    executor: EntityManager | Connection = this.connection,
  ) {
    let where = '';
    if (network === Networks.Mainnet) {
      where += 'project.mainnetId = :projectId';
      where += ' AND isTestnet = 0';
    } else {
      where += 'project.testnetId = :projectId';
      where += ' AND isTestnet = 1';
    }

    if (gallery === MintoriaGalleries.Selected) {
      where += ' AND contract.name = "Mintoria Selected"';
    } else {
      where += ' AND contract.name = "Mintoria Open World"';
    }

    return this.getCustomQueryBuilder(this.alias, executor)

      .leftJoinAndSelectMany([
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ])
      .where(where, { projectId })
      .getCount();
  }

  public getRarerTokensThan(
    projectId: number,
    rarityScore: number,
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .where(
        'projectId = :projectId AND rarityScore > :rarityScore',
        { projectId, rarityScore },
      )
      .getCount();
  }

  public getFeaturedTokenByProject(
    project: Project | ExtendedProject,
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .where('projectId = :projectId', {
        projectId: project.id,
        featuredTokenId: project.featuredTokenId,
      })
      .skip(project.featuredTokenId)
      .take(1)
      .getOne();
  }

  public getMainnetCount(
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .leftJoinAndSelectMany([])
      .where('token.isTestnet = :isTestnet', { isTestnet: 0 })
      .getCount();
  }
}

export const TokenRepository = new TokenRepositoryImpl(
  Token,
  'token',
);
