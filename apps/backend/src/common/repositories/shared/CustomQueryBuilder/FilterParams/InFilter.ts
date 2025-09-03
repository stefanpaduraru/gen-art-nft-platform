import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';

interface InFilterType {
  columnName: string;
  tableAlias?: string;
  value: any[];
  virtualField?: boolean;
}

export class InFilter extends AbstractFilterParam {
  public readonly columnName: string;

  public readonly tableAlias?: string;

  private readonly value: any[];

  private readonly virtualField?: boolean;

  constructor({ columnName, tableAlias, value, virtualField }: InFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = this.normalize(value);
    this.virtualField = virtualField;
  }

  public getQuery(rootTableAlias: string) {
    const tableAlias = this.tableAlias || rootTableAlias;

    if (this.virtualField) {
      return `${this.columnName} IN (${this.getValue().join(', ')})`;
    }

    return `${tableAlias}.${this.columnName} IN (${this.getValue().join(
      ', ',
    )})`;
  }

  public getApiFilter(): ApiFilter[] {
    return [
      {
        field: this.columnName,
        value: this.value.join(','),
      },
    ];
  }

  private normalize(value: any): any {
    if (!Array.isArray(value)) {
      return [value];
    }

    return value;
  }

  private getValue() {
    return this.value.map((val) => {
      if (typeof val === 'string') {
        return `'${val}'`;
      }
      if (typeof val === 'boolean') {
        return Number(val);
      }

      return val;
    });
  }
}
