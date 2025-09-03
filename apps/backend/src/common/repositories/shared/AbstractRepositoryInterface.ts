import {
  EntityManager,
  Connection,
  UpdateResult,
  DeleteResult,
  DeepPartial,
} from "typeorm";
import {
  RelationObject,
  FindQueryOptions,
} from "./CustomQueryBuilder/CustomQueryBuilder.types";
import { IdIndexable } from "@common/interfaces/IdIndexable";
import { User } from "@common/entities/User";

export interface AbstractRepositoryInterface<T> {
  createOne(
    data: T,
    executor?: EntityManager | Connection,
    requester?: User & IdIndexable
  ): Promise<T>;

  createMany(
    data: T[],
    executor?: EntityManager | Connection,
    requester?: User & IdIndexable
  ): Promise<T[]>;

  updateMany(
    data: (Partial<T> & { id: number })[],
    executor?: EntityManager | Connection
  ): Promise<T[]>;

  updateOne(
    id: number,
    data: Partial<T>,
    executor?: EntityManager | Connection
  ): Promise<T & IdIndexable>;

  findById(
    id: number,
    executor?: EntityManager | Connection,
    includeDeleted?: boolean
  ): Promise<(T & IdIndexable) | undefined>;

  findWithoutRelationships(
    id: number,
    executor?: EntityManager | Connection
  ): Promise<(T & IdIndexable) | undefined>;

  findAll(
    relations?: RelationObject[],
    options?: FindQueryOptions,
    executor?: EntityManager | Connection
  ): Promise<(T & IdIndexable)[]>;

  getCount(
    relations?: RelationObject[],
    options?: FindQueryOptions,
    executor?: EntityManager | Connection
  ): Promise<number>;

  findByIds(ids: number[], executor?: EntityManager | Connection): Promise<T[]>;

  findWithRelations(
    id: number,
    relations: RelationObject[],
    executor?: EntityManager | Connection,
    includeDeleted?: boolean
  ): Promise<(T & IdIndexable) | undefined>;

  findManyWhere(
    whereQuery: string,
    whereParams: object,
    relations?: RelationObject[],
    executor?: EntityManager | Connection
  ): Promise<(T & IdIndexable)[]>;

  findOneWhere<ResultType>(
    whereQuery: string,
    whereParams?: object,
    relations?: RelationObject[],
    executor?: EntityManager | Connection
  ): Promise<(T & IdIndexable & ResultType) | undefined>;

  query(
    queryString: string,
    parameters?: any[],
    executor?: EntityManager | Connection
  ): Promise<any>;

  deleteOneById(
    id: number,
    allowHardDelete?: boolean,
    executor?: EntityManager | Connection
  ): Promise<number | UpdateResult | DeleteResult>;

  restoreOneById(
    id: number,
    executor?: EntityManager | Connection
  ): Promise<number | UpdateResult>;

  deleteManyByIds(
    ids: number[],
    allowHardDelete?: boolean,
    executor?: EntityManager | Connection
  ): Promise<(number | UpdateResult | DeleteResult)[]>;

  isExistsById(
    id: number,
    executor?: EntityManager | Connection
  ): Promise<boolean>;

  deleteHardMany(ids: number[]): Promise<DeleteResult>;
  batchUpsert(data: Partial<T[]>): Promise<DeepPartial<T>>;
}
