import { FilterParamsType } from './FilterParams/FilterParams';

export interface PaginationParams {
  page: number;
  perPage: number;
}

export type RelationObject = [string, string] | [string, string, string];

type AnyField = string;

export type OrderDirection = 'ASC' | 'DESC';

export interface SortingParams<Field extends string = AnyField> {
  orderBy?: Field;
  order?: OrderDirection;
}

export interface FindQueryOptions<Field extends string = AnyField> {
  filterParams?: FilterParamsType[];
  paginationParams?: PaginationParams;
  sortingParams?: SortingParams<Field>;
}
