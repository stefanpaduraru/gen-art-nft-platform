import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

interface BooleanFilterType {
  columnName: string
  tableAlias?: string
  value: boolean
}

export class BooleanFilter extends AbstractFilterParam {
  public readonly columnName: string

  public readonly tableAlias?: string

  private readonly value: number

  constructor({ columnName, tableAlias, value }: BooleanFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = Number(value);
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;

    return `${tableAlias}.${this.columnName} = ${this.value}`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: this.value ? 'true' : 'false',
      },
    ];
  }
}
