import {
  ObjectType,
  EntityManager,
  Connection,
  DeepPartial,
  InsertResult,
  getManager,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import * as _ from 'lodash';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { dbConnectionManager } from '../../../dbConnectionManager';
import { CustomQueryBuilder } from './CustomQueryBuilder/CustomQueryBuilder';
import {
  RelationObject,
  FindQueryOptions,
} from './CustomQueryBuilder/CustomQueryBuilder.types';
import { IdIndexable, Indexed } from '@common/interfaces/IdIndexable';
import { Omit } from '@common/types/Omit';
import { User } from '@common/entities/User';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractRepositoryInterface } from './AbstractRepositoryInterface';
import { logger } from '@common/services/Logger';

export abstract class AbstractRepository<Entity>
  implements AbstractRepositoryInterface<Entity>
{
  protected readonly alias: string;

  protected readonly entity: ObjectType<Entity>;

  constructor(entity: ObjectType<Entity>, alias = 'root') {
    this.entity = entity;
    this.alias = alias;
  }

  protected static getEqualOrNullSql<T>(
    value: T,
    column: string,
    param: string,
    includeNullSide = true,
  ) {
    const nullSide = includeNullSide ? `${column} IS NULL` : '';
    return value == null ? `${column}=:${param}` : nullSide;
  }

  public async createOne(
    data: Partial<Entity>,
    executor: EntityManager | Connection = this.connection,
    requester?: Indexed<User>,
  ): Promise<Entity & IdIndexable> {
    const id = this.getIdFromInsertResult(
      await executor
        .getRepository(this.entity)
        .createQueryBuilder()
        .insert()
        .values(this.omitItemId(data as unknown as any))
        .execute(),
    );

    const entity = await this.findById(id, executor);

    if (entity) {
      return entity;
    }
    logger.error(
      `Could not create entity: ${this.alias} ${
        requester && requester.id
      }`,
    );
    throw new Error('Could not create information');
  }

  public createMany(
    data: Entity[],
    executor: EntityManager | Connection = this.connection,
    requester?: User & IdIndexable,
  ): Promise<Entity[]> {
    // TODO: this is inefficient as we are calling createOne x times
    // typeorm allows arrays and does bulk operations automatically
    // https://typeorm.io/#/insert-query-builder
    return Promise.all(
      data.map((datum) => this.createOne(datum, executor, requester)),
    );
  }

  public async insertMany(
    data: Entity[],
    executor: EntityManager | Connection = this.connection,
    requester?: User & IdIndexable,
  ): Promise<(Entity & IdIndexable)[]> {
    const insertResults = await executor
      .getRepository<Entity & IdIndexable>(this.entity)
      .createQueryBuilder()
      .insert()
      .values(
        data.map((item) => this.omitItemId(item as unknown as any)),
      )
      .execute();

    const insertedIds = insertResults.identifiers.map(
      (identifier) => identifier.id,
    );
    const entities = await this.findByIds(insertedIds, executor);

    if (
      entities.length === data.length &&
      entities.every((entity) => !_.isUndefined(entity))
    ) {
      return entities;
    }

    logger.error(
      `Could not create entity: ${this.alias} ${
        requester && requester.id
      }`,
    );
    throw new Error('Could not create record');
  }

  public updateMany(
    data: (Partial<Entity> & { id: number })[],
    executor: EntityManager | Connection = this.connection,
  ): Promise<Entity[]> {
    // TODO: this is inefficient as we are calling updateOne x times
    // typeorm allows where clause and does bulk operations automatically
    // https://typeorm.io/#/update-query-builder
    return Promise.all(
      data.map((datum) => this.updateOne(datum.id, datum, executor)),
    );
  }

  public updateWhere(
    data: Partial<Entity>,
    whereQuery:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    whereParams: ObjectLiteral,
    executor: EntityManager | Connection = this.connection,
  ): Promise<UpdateResult> {
    return executor
      .getRepository(this.entity)
      .createQueryBuilder()
      .update()
      .set(
        this.omitItemId(
          data as QueryDeepPartialEntity<Entity> & IdIndexable,
        ) as QueryDeepPartialEntity<Entity>,
      )
      .where(whereQuery, whereParams)
      .execute();
  }

  public async updateOneWithoutReQuery(
    id: number,
    data: Partial<Entity>,
    executor: EntityManager | Connection = this.connection,
  ): Promise<void> {
    await executor
      .getRepository(this.entity)
      .createQueryBuilder()
      .update()
      .set(
        this.omitItemId(
          data as QueryDeepPartialEntity<Entity> & IdIndexable,
        ) as QueryDeepPartialEntity<Entity>,
      )
      .where('id = :id', { id })
      .execute();
  }

  public async updateOne(
    id: number,
    data: Partial<Entity>,
    executor: EntityManager | Connection = this.connection,
  ): Promise<Entity & IdIndexable> {
    await executor
      .getRepository(this.entity)
      .createQueryBuilder()
      .update()
      .set(
        this.omitItemId(
          data as QueryDeepPartialEntity<Entity> & IdIndexable,
        ) as QueryDeepPartialEntity<Entity>,
      )
      .where('id = :id', { id })
      .execute();

    const entity = await this.findById(id, executor, true);
    if (entity) {
      return entity;
    }

    logger.error(
      `Entity: ${this.entity}, id: ${id} cannot be updated`,
    );
    throw new Error('Could not update entity');
  }

  public findById(
    id: number,
    executor: EntityManager | Connection = this.connection,
    includeDeleted?: boolean,
  ): Promise<(Entity & IdIndexable) | undefined> {
    return this.getCustomQueryBuilder(this.alias, executor)
      .where(`${this.alias}.id=:id`, { id })
      .getOne(includeDeleted);
  }

  public async findWithoutRelationships(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ) {
    return this.getCustomQueryBuilder(this.alias, executor)
      .where(`${this.alias}.id=:id`, { id })
      .getOne();
  }

  public findAll<RelationsType>(
    relations: RelationObject[] = [],
    options: FindQueryOptions = {},
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Entity & IdIndexable & RelationsType)[]> {
    return this.getCustomQueryBuilder<RelationsType>(
      this.alias,
      executor,
    )
      .leftJoinAndSelectMany(relations)
      .andFilterMany(options.filterParams)
      .sort(options.sortingParams)
      .paginate(options.paginationParams)
      .getMany();
  }

  public unsafeFindAllWithEager(
    relations?: string[],
    executor: EntityManager | Connection = this.connection,
  ): Promise<Entity[]> {
    // fix for typeorm EntityColumnNotFound error
    if (!relations) {
      return executor.getRepository(this.entity).find();
    }

    return executor.getRepository(this.entity).find({
      relations,
    });
  }

  public getCount(
    relations: RelationObject[] = [],
    options: FindQueryOptions = {},
    executor: EntityManager | Connection = this.connection,
  ): Promise<number> {
    return this.getCustomQueryBuilder(this.alias, executor)
      .leftJoinAndSelectMany(relations)
      .andFilterMany(options.filterParams)
      .getCount();
  }

  public findByIds(
    ids: number[],
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Entity & IdIndexable)[]> {
    return executor
      .getRepository<Entity & IdIndexable>(this.entity)
      .createQueryBuilder()
      .select()
      .where(`id IN(${ids})`)
      .getMany();
  }

  public async findWithRelations(
    id: number,
    relations: RelationObject[],
    executor: EntityManager | Connection = this.connection,
    includeDeleted = false,
  ): Promise<(Entity & IdIndexable) | undefined> {
    return this.getCustomQueryBuilder(this.alias, executor)
      .leftJoinAndSelectMany(relations)
      .where(`${this.alias}.id=:id`, { id })
      .getOne(includeDeleted);
  }

  public findManyWhere(
    whereQuery: string,
    whereParams: object = {},
    relations: RelationObject[] = [],
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Entity & IdIndexable)[]> {
    return this.getCustomQueryBuilder(this.alias, executor)
      .leftJoinAndSelectMany(relations)
      .where(whereQuery, whereParams)
      .getMany();
  }

  public findOneWhere<ResultType>(
    whereQuery: string,
    whereParams: object = {},
    relations: RelationObject[] = [],
    executor: EntityManager | Connection = this.connection,
  ): Promise<(Entity & IdIndexable & ResultType) | undefined> {
    return this.getCustomQueryBuilder<
      Entity & IdIndexable & ResultType
    >(this.alias, executor)
      .leftJoinAndSelectMany(relations)
      .where(whereQuery, whereParams)
      .getOne();
  }

  public query(
    queryString: string,
    parameters?: any[],
    executor: EntityManager | Connection = this.connection,
  ) {
    return executor
      .getRepository(this.entity)
      .query(queryString, parameters);
  }

  public async deleteOneById(
    id: number,
    allowHardDelete = false,
    executor: EntityManager | Connection = this.connection,
  ): Promise<number | UpdateResult | DeleteResult> {
    if (allowHardDelete) {
      return (
        await executor
          .getRepository(this.entity)
          .createQueryBuilder()
          .delete()
          .from(this.entity)
          .where('id = :id', { id })
          .execute()
      ).raw.affectedRows;
    }

    return (
      await executor
        .getRepository(this.entity)
        .createQueryBuilder()
        .update()
        .set({ isDeleted: true } as any)
        .where('id = :id', { id })
        .execute()
    ).raw.affectedRows;
  }

  public async restoreOneById(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<number | UpdateResult> {
    return (
      await executor
        .getRepository(this.entity)
        .createQueryBuilder()
        .update()
        .set({ isDeleted: false } as any)
        .where('id = :id', { id })
        .execute()
    ).raw.affectedRows;
  }

  public async deleteManyByIds(
    ids: number[],
    allowHardDelete = false,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(number | UpdateResult | DeleteResult)[]> {
    // TODO: this is inefficient; typeorm allows batch delete by passing in an array
    // see deleteManyHard
    return Promise.all(
      ids.map((id) =>
        this.deleteOneById(id, allowHardDelete, executor),
      ),
    );
  }

  public instantiate(data: DeepPartial<Entity>) {
    return this.connection.getRepository(this.entity).create(data);
  }

  public get connection() {
    return dbConnectionManager.getConnection();
  }

  public async isExistsById(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<boolean> {
    const record = await this.getCustomQueryBuilder(
      this.alias,
      executor,
    )
      .where(`${this.alias}.id=:id`, { id })
      .getOne();

    return !!record;
  }

  public async deleteHardMany(ids: number[]): Promise<DeleteResult> {
    return this.connection.getRepository(this.entity).delete(ids);
  }

  public async batchUpsert(
    data: Partial<Entity[]>,
  ): Promise<DeepPartial<Entity>> {
    return this.connection
      .getRepository(this.entity)
      .save(data as any);
  }

  protected getCustomQueryBuilder<ResultType>(
    alias: string = this.alias,
    executor: EntityManager | Connection = this.connection,
  ) {
    return new CustomQueryBuilder<Entity, ResultType>(
      this.entity,
      alias,
      executor,
    );
  }

  protected omitItemId = <T>(
    item: T & IdIndexable,
  ): Omit<T, 'id'> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = item;

    return rest;
  };

  protected getIdFromInsertResult(result: InsertResult) {
    return result.identifiers[0].id;
  }

  protected getTransaction(): EntityManager {
    return getManager();
  }
}
