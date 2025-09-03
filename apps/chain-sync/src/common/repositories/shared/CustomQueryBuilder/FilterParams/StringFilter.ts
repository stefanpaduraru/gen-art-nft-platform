import { AbstractFilterParam, ApiFilter } from './AbstractFilterParam';
import validator from 'validator';

const DEFAULT_WILDCARD_MIN_STRING_LENGTH = 4;

interface StringFilterType {
  columnName: string
  tableAlias?: string
  value: string
  options?: {
    leftWildcard?: boolean
    rightWildcard?: boolean
    wildCardMinStringLength?: number
  }
}

export class StringFilter extends AbstractFilterParam {
  public readonly columnName: string

  public readonly tableAlias?: string

  private readonly value: string

  private readonly leftWildcard: boolean

  private readonly rightWildcard: boolean

  private readonly wildCardMinStringLength: number

  constructor({
    columnName,
    tableAlias,
    value,
    options = {},
  }: StringFilterType) {
    super();
    this.columnName = columnName;
    this.tableAlias = tableAlias;
    this.value = value;
    this.leftWildcard = options.leftWildcard || false;
    this.rightWildcard = options.rightWildcard || false;
    this.wildCardMinStringLength = options.wildCardMinStringLength || DEFAULT_WILDCARD_MIN_STRING_LENGTH;
  }

  public getQuery(rootTableAlias: string) {
    const value = validator.escape(this.value);
    const tableAlias = this.tableAlias || rootTableAlias;

    if (value.length < this.wildCardMinStringLength) {
      return `${tableAlias}.${this.columnName} = '${value}'`;
    }
    const operator = this.leftWildcard || this.rightWildcard ? 'LIKE' : '=';
    const leftWildcardOp = this.leftWildcard ? '%' : '';
    const rightWildcardOp = this.rightWildcard ? '%' : '';

    return `
      ${tableAlias}.${this.columnName} ${operator}
        '${leftWildcardOp}${value}${rightWildcardOp}'
    `;
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
