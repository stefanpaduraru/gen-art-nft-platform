import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

interface NumberFilterType {
  columnName: string
  tableAlias?: string
  value: number
  options?: {
    operator?: string
  }
}

export class NumberFilter extends AbstractFilterParam {
  public readonly columnName: string

  public readonly tableAlias?: string

  private readonly value: number

  private readonly operator: string

  constructor({
    columnName,
    tableAlias,
    value,
    options = {},
  }: NumberFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = value;
    this.operator = options.operator || '=';
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;

    return `${tableAlias}.${this.columnName} ${this.operator} ${this.value}`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: String(this.value),
      },
    ];
  }
}
