export interface ApiFilter {
  field: string
  value: string
}

export abstract class AbstractFilterParam {
  abstract getQuery(tableAlias: string): string

  abstract getApiFilter(): ApiFilter[]

  public normalizeDate(date: Date, endOfDay = false) {
    if (date.constructor !== Date) throw new Error('Invalid query Date format.');

    if (endOfDay) {
      return `${date.toISOString().split('T')[0]} 23:59:59.999`;
    }

    return date.toISOString().split('T')[0];
  }
}
