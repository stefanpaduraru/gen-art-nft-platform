import { AbstractRepository } from "@common/repositories/shared/AbstractRepository";
import { Collection } from "@common/entities/Collection";

class CollectionRepositoryImpl extends AbstractRepository<Collection> {}

export const CollectionRepository = new CollectionRepositoryImpl(
  Collection,
  "collection"
);
