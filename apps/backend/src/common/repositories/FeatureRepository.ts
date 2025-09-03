import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { Feature } from '@common/entities/Feature';

class FeatureRepositoryImpl extends AbstractRepository<Feature> {}

export const FeatureRepository = new FeatureRepositoryImpl(
  Feature,
  'feature',
);
