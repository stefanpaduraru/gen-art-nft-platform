import {
  SelectQueryBuilder,
  ObjectType,
  EntityManager,
  Connection,
  ObjectLiteral,
  Brackets,
} from "typeorm";
import {
  RelationObject,
  PaginationParams,
  SortingParams,
} from "./CustomQueryBuilder.types";
import { FilterParamsType } from "./FilterParams/FilterParams";
import { IdIndexable } from "@common/interfaces/IdIndexable";
import { logger } from "@common/services/Logger";

type ComputedFieldMapper<Entity, ResultType> = (
  entity: Entity & IdIndexable & ResultType,
  raw: any
) => Entity & IdIndexable & ResultType;

export class CustomQueryBuilder<Entity, ResultType> {
  private query: SelectQueryBuilder<Entity & IdIndexable & ResultType>;

  private alias: string;

  constructor(
    entity: ObjectType<Entity>,
    alias: string,
    executor: EntityManager | Connection
  ) {
    this.alias = alias;
    this.query = executor
      .getRepository<Entity & IdIndexable & ResultType>(entity)
      .createQueryBuilder(alias);
  }

  public getQueryObject() {
    return this.query;
  }

  public getMany(includeDeleted = false) {
    if (includeDeleted) {
      return this.query.getMany();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getMany();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getMany();
  }

  public getManyAndCount(includeDeleted = false) {
    if (includeDeleted) {
      return this.query.getManyAndCount();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getManyAndCount();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getManyAndCount();
  }

  public getOne(includeDeleted = false) {
    if (includeDeleted) {
      return this.query.getOne();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getOne();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getOne();
  }

  public deleteHard() {
    return this.query.delete().execute();
  }

  public getCount(includeDeleted = false) {
    if (includeDeleted) {
      return this.query.getCount();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getCount();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getCount();
  }

  public getSql() {
    return this.query.getSql();
  }

  public getRawAndEntities() {
    return this.query.getRawAndEntities();
  }

  public async getWithComputedFieldsOne(
    computedFieldMappers: ComputedFieldMapper<Entity, ResultType>[]
  ): Promise<(Entity & IdIndexable & ResultType) | undefined> {
    const { raw, entities } = await this.getRawAndEntities();
    const entity = entities[0];
    if (!entity) return;

    return this.mapWithComputedField(entity, computedFieldMappers, raw);
  }

  public async getWithComputedFieldsMany(
    computedFieldMappers: ComputedFieldMapper<Entity, ResultType>[]
  ): Promise<(Entity & IdIndexable & ResultType)[]> {
    const { raw, entities } = await this.getRawAndEntities();

    return entities.map((entity: Entity & IdIndexable & ResultType) =>
      this.mapWithComputedField(entity, computedFieldMappers, raw)
    );
  }

  public getSum(columnAlias: string, resultAlias = "sum") {
    return this.query.select(`SUM(${columnAlias})`, resultAlias).getRawOne();
  }

  public loadRelationCountAndMap(
    mapToProperty: string,
    relationName: string,
    aliasName?: string,
    queryBuilderFactory?: (
      qb: SelectQueryBuilder<any>
    ) => SelectQueryBuilder<any>
  ) {
    return this.query.loadRelationCountAndMap(
      mapToProperty,
      relationName,
      aliasName,
      queryBuilderFactory
    );
  }

  public leftJoin(
    relation: string,
    alias: string,
    condition?: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.leftJoin(
      relation,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public leftJoinAndMapMany(
    mapToProperty: string,
    entity: any,
    alias: string,
    condition: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.leftJoinAndMapMany(
      mapToProperty,
      entity,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public leftJoinAndMapManyOnEntity(
    map: string,
    entity: Function | string,
    alias: string,
    condition?: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.leftJoinAndMapMany(
      map,
      entity,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public innerJoinAndSelectOnEntity(
    entity: Function | string,
    alias: string,
    condition?: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.innerJoinAndSelect(
      entity,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public leftJoinAndSelect(
    relation: string,
    alias: string,
    condition?: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.leftJoinAndSelect(
      relation,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public innerJoinAndSelect(
    relation: string,
    alias: string,
    condition?: string,
    parameters?: ObjectLiteral
  ) {
    const filteredDeletedRecords = `${alias}.isDeleted=0`;
    const combinedCondition = condition
      ? `${condition} AND ${filteredDeletedRecords}`
      : filteredDeletedRecords;

    this.query = this.query.innerJoinAndSelect(
      relation,
      alias,
      combinedCondition,
      parameters
    );

    return this;
  }

  public leftJoinAndSelectMany(relationsArray: RelationObject[]) {
    for (const [relation, alias, condition] of relationsArray) {
      this.leftJoinAndSelect(relation, alias, condition);
    }

    return this;
  }

  public leftJoinMany(relationsArray: RelationObject[]) {
    for (const [relation, alias, condition] of relationsArray) {
      this.leftJoin(relation, alias, condition);
    }

    return this;
  }

  public select(selection: string | string[], stringAliasName?: string) {
    if (Array.isArray(selection)) {
      this.query = this.query.select(selection);
    } else if (typeof selection === "string" && stringAliasName) {
      this.query = this.query.select(selection, stringAliasName);
    } else {
      logger.error("Invalid function parameters for SelectQueryBuilder.select");
      throw new Error(
        "Invalid function parameters for SelectQueryBuilder.select"
      );
    }

    return this;
  }

  public where(
    where: string | Brackets | ((qb: this) => string),
    parameters?: ObjectLiteral
  ) {
    this.query = this.query.where(where, parameters);

    return this;
  }

  public andWhere(where: string | Brackets, parameters?: ObjectLiteral) {
    this.query = this.query.andWhere(where, parameters);

    return this;
  }

  public orWhere(where: string, parameters?: ObjectLiteral) {
    this.query = this.query.orWhere(where, parameters);

    return this;
  }

  public whereInIds(ids: number[]) {
    this.query = this.query.whereInIds(ids);

    return this;
  }

  public orWhereInIds(ids: number[]) {
    this.query = this.query.orWhereInIds(ids);

    return this;
  }

  public andWhereIsNotDeletedBankAccount() {
    this.query = this.query.andWhere(
      new Brackets((qb) =>
        qb
          .orWhere("bankAccount.isDeleted = 0")
          .orWhere("bankAccount.isDeleted is NULL")
      )
    );

    return this;
  }

  public sort(sortingParams?: SortingParams, skipPrependAliasFor?: string[]) {
    if (!sortingParams) return this;

    const { orderBy = "createdAt", order = "DESC" } = sortingParams;

    let prependStrategy = this.prependAliasIfMissing(
      encodeURIComponent(orderBy)
    );

    if (skipPrependAliasFor?.includes?.(orderBy)) {
      prependStrategy = orderBy;
    }

    this.query = this.query.orderBy(prependStrategy, order);

    return this;
  }

  public addSort(
    sortingParams?: SortingParams,
    skipPrependAliasFor?: string[]
  ) {
    if (!sortingParams) return this;

    const { orderBy = "createdAt", order = "DESC" } = sortingParams;

    let prependStrategy = this.prependAliasIfMissing(
      encodeURIComponent(orderBy)
    );

    if (skipPrependAliasFor?.includes?.(orderBy)) {
      prependStrategy = orderBy;
    }

    this.query = this.query.addOrderBy(prependStrategy, order);

    return this;
  }

  public andFilterMany(filterParams: FilterParamsType[] = []) {
    if (!filterParams) return this;

    for (const filterParam of filterParams) {
      this.andFilter(filterParam);
    }

    return this;
  }

  public orFilterMany(filterParams: FilterParamsType[] = []) {
    if (!filterParams) return this;

    for (const filterParam of filterParams) {
      this.orFilter(filterParam);
    }

    return this;
  }

  public filter(filterParam: FilterParamsType) {
    this.query = this.query.where(filterParam.getQuery(this.alias));

    return this;
  }

  public execute() {
    return this.query.execute();
  }

  public andFilter(filterParam: FilterParamsType) {
    this.query = this.query.andWhere(filterParam.getQuery(this.alias));

    return this;
  }

  public orFilter(filterParam: FilterParamsType) {
    this.query = this.query.orWhere(filterParam.getQuery(this.alias));

    return this;
  }

  public paginate(params?: PaginationParams) {
    if (!params) return this;

    this.ensureValidPaginationParams(params);
    this.query = this.query
      .skip((params.page - 1) * params.perPage)
      .take(params.perPage);

    return this;
  }

  public paginateWithLimit(params?: PaginationParams) {
    if (!params) return this;

    this.ensureValidPaginationParams(params);
    this.query = this.query
      .offset((params.page - 1) * params.perPage)
      .limit(params.perPage);

    return this;
  }

  public orderBy(key: string, order: "ASC" | "DESC" = "DESC") {
    this.query = this.query.orderBy(key, order);

    return this;
  }

  public getRawOne({ includeDeleted = false } = {}) {
    if (includeDeleted) {
      return this.query.getRawOne();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getRawOne();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getRawOne();
  }

  public getRawMany({ includeDeleted = false } = {}) {
    if (includeDeleted) {
      return this.query.getRawMany();
    }

    if (this.query.expressionMap.wheres.length === 0) {
      return this.query.where(`${this.alias}.isDeleted=0`).getRawMany();
    }

    return this.query.andWhere(`${this.alias}.isDeleted=0`).getRawMany();
  }

  public groupBy(columnAlias: string) {
    this.query.groupBy(columnAlias);

    return this;
  }

  public selectDistinct(columns: string) {
    this.query = this.query.select(`DISTINCT ${columns}`);

    return this;
  }

  public addSelect(selection: string, stringAliasName?: string) {
    if (Array.isArray(selection)) {
      this.query = this.query.addSelect(selection);
    } else if (typeof selection === "string" && stringAliasName) {
      this.query = this.query.addSelect(selection, stringAliasName);
    } else {
      logger.error(
        "Invalid function parameters for SelectQueryBuilder.addSelect"
      );
      throw new Error(
        "Invalid function parameters for SelectQueryBuilder.addSelect"
      );
    }

    return this;
  }

  private mapWithComputedField(
    entity: Entity & IdIndexable & ResultType,
    computedFieldMappers: ComputedFieldMapper<Entity, ResultType>[],
    raw: any[]
  ): Entity & IdIndexable & ResultType {
    const rowData = raw.find(
      (rowDataPacket) => rowDataPacket[`${this.alias}_id`] === entity.id
    );
    computedFieldMappers.forEach((mapperFn) => {
      entity = mapperFn(entity, rowData || {});
    });

    return entity;
  }

  private ensureValidPaginationParams(params: PaginationParams) {
    if (params.page <= 0 || params.perPage <= 0) {
      throw new Error("Invalid pagination params.");
    }
  }

  private prependAliasIfMissing(columnName: string) {
    if (columnName.includes(".")) return columnName;

    return `${this.alias}.${columnName}`;
  }
}
