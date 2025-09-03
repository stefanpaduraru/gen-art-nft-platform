import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

interface IsNullFilterType {
  columnName: string
  tableAlias?: string
  value: boolean
}

export class IsNullFilter extends AbstractFilterParam {
  public readonly columnName: string

  public readonly tableAlias?: string

  private readonly value: boolean

  constructor({ columnName, tableAlias, value }: IsNullFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = value;
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;

    return `${tableAlias}.${this.columnName} IS${
      this.value ? ' ' : ' NOT '
    }NULL`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: `${this.value && '!'}null`,
      },
    ];
  }
}
