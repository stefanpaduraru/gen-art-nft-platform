type NumberOrNil = number | undefined | null

export const transformIntToNullBool = {
  from: (v: number | undefined) => (v === undefined ? v : !!v),
  to: (v: number | undefined) => (v === undefined ? v : +v),
};

export const transformIntToBoolAllowNull = {
  from: (v: NumberOrNil) => (v === null ? null : (v === undefined ? v : !!v)),
  to: (v: NumberOrNil) => (v === null ? null : (v === undefined ? v : +v)),
};

export const transformToJSON = {
  from: (v: string | undefined) => (v === undefined ? v : JSON.parse(v)),
  to: (v: any) => (v === undefined ? v : JSON.stringify(v)),
};

/**
 * @deprecated Use `string` type instead.
 */
export const transformDecimalToNumber = {
  from: (v: string | undefined) => (v === undefined ? v : parseInt(v, 10)),
  to: (v: string | undefined) => (v === undefined ? v : `${v}`),
};

export const transformIntToString = {
  from: (v: NumberOrNil) => (v === undefined || v === null ? v : v.toString()),
  to: (v: string | undefined | null) =>
    (v === undefined || v === null ? v : parseInt(v, 10)),
};

export const transformDateToString = {
  from: (v: Date | undefined | null) =>
    (v === undefined || v === null ? v : v.toString()),
  to: (v: string | undefined | null) =>
    (v === undefined || v === null ? v : new Date(v)),
};

export const transformIntToBool = {
  from: (v: number): boolean => !!v,
  to: (v: boolean): number => (v ? 1 : 0),
};
