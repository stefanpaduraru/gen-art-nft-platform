import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

interface DateFilterType {
  columnName: string;
  tableAlias?: string;
  value: Date;
  options?: {
    operator?: string;
  };
}

export class DateFilter extends AbstractFilterParam {
  public readonly columnName: string;

  public readonly tableAlias?: string;

  private readonly value: string;

  private readonly operator: string;

  constructor({ columnName, tableAlias, value, options = {} }: DateFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = this.normalizeDate(value);
    this.operator = options.operator || '=';
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;
    return `date(${tableAlias}.${this.columnName}) ${this.operator} '${this.value}'`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: this.value,
      },
    ];
  }
}
