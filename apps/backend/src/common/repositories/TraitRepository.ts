import { Connection, EntityManager } from 'typeorm';
import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { Trait } from '@common/entities/Trait';

class TraitRepositoryImpl extends AbstractRepository<Trait> {}

export const TraitRepository = new TraitRepositoryImpl(
  Trait,
  'trait',
);
