import { Connection, EntityManager } from 'typeorm';
import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { IdIndexable } from '@common/interfaces/IdIndexable';
import { Token } from '@common/entities/Token';
import { RelationObject } from '@common/repositories/shared/CustomQueryBuilder/CustomQueryBuilder.types';
import { Network, Networks } from '@common/types/Network';

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
      [['token.project', 'project']],
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

  public async getAllTokensByProjectId(
    projectId: number,
    network: Network,
  ) {
    return TokenRepository.findManyWhere(
      `projectId = :projectId AND isTestnet = ${
        network === Networks.Testnet ? 1 : 0
      }`,
      {
        projectId,
      },
      [['token.trait', 'trait']],
    );
  }

  public getAllTokensByProjectCount(
    projectId: number,
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .where('projectId = :projectId', { projectId })
      .getCount();
  }
}

export const TokenRepository = new TokenRepositoryImpl(
  Token,
  'token',
);
