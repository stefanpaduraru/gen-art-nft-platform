import { Collection } from "@common/entities/Collection";

// tslint:disable-next-line: no-namespace
export namespace CollectionSerializer {
  export const serializeShortCollection = (collection: Collection) => ({
    id: collection.id,
    name: collection.name,
  });
}
