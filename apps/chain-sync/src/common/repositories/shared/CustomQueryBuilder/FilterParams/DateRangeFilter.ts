import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

export interface DateRangeValue {
  rangeFrom?: Date
  rangeTo?: Date
}

interface DateRangeFilterType {
  columnName: string
  tableAlias?: string
  value: DateRangeValue
}

export class DateRangeFilter extends AbstractFilterParam {
  public readonly columnName: string

  public readonly tableAlias?: string

  private rangeFrom: string | null

  private rangeTo: string | null

  constructor({ columnName, tableAlias, value }: DateRangeFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.rangeFrom = value.rangeFrom ?
      this.normalizeDate(value.rangeFrom) :
      null;
    this.rangeTo = value.rangeTo ?
      this.normalizeDate(value.rangeTo, true) :
      null;
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;
    if (this.rangeFrom && this.rangeTo) {
      return `
        ${tableAlias}.${this.columnName}
        BETWEEN '${this.rangeFrom}'
        AND '${this.rangeTo}'`;
    }

    if (this.rangeFrom) {
      return `${tableAlias}.${this.columnName} >= '${this.rangeFrom}'`;
    }

    return `${tableAlias}.${this.columnName} <= '${this.rangeTo}'`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: `${this.rangeFrom}:${this.rangeTo}`,
      },
    ];
  }
}
