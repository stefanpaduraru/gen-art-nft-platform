import { StringFilter } from './StringFilter';
import { NumberFilter } from './NumberFilter';
import { BooleanFilter } from './BooleanFilter';
import { DateFilter } from './DateFilter';
import { DateRangeFilter } from './DateRangeFilter';
import { OrFilter } from './OrFilter';
import { IsNullFilter } from './IsNullFilter';
import { AndFilter } from './AndFilter';
import { InFilter } from './InFilter';

export const FilterParams = {
  StringFilter,
  NumberFilter,
  BooleanFilter,
  DateFilter,
  DateRangeFilter,
  OrFilter,
  IsNullFilter,
  AndFilter,
  InFilter,
};

export type FilterParamsType =
  | StringFilter
  | NumberFilter
  | BooleanFilter
  | DateFilter
  | DateRangeFilter
  | OrFilter
  | IsNullFilter
  | AndFilter
  | InFilter;
