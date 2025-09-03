export interface IdIndexable {
  id: number;
}

export type Indexed<T> = T & {
  id: number;
};

export type NonIndexed<T> = T & {
  id: undefined;
};

export function isIdIndexable(entity: any): entity is IdIndexable {
  return !!(entity && entity.id && typeof entity.id === "number");
}
