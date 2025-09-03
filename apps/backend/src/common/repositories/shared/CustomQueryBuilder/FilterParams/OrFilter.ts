import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';
import { FilterParamsType } from './FilterParams';

export class OrFilter extends AbstractFilterParam {
  private readonly filters: FilterParamsType[]

  constructor(filters: FilterParamsType[]) {
    super();
    this.filters = filters;
  }

  public getQuery(rootTableAlias: string): string {
    return `(${this.filters
      .map((filter: FilterParamsType) => filter.getQuery(rootTableAlias))
      .join(' OR ')})`;
  }

  public getApiFilter(): ApiFilter[] {
    const apiFilter: ApiFilter[] = [];
    this.filters.forEach((filter: FilterParamsType) =>
      apiFilter.concat(filter.getApiFilter()),
    );

    return apiFilter;
  }
}
