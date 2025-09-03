import { Feature } from "@common/entities/Feature";
import { Action } from "routing-controllers";

// tslint:disable-next-line: no-namespace
export namespace FeatureSerializer {
  export const serializeOneFeature = (feature: Feature) => ({
    id: feature.id,
    name: feature?.name,
  });

  export const serializeFeatures = (features: Feature[]) =>
    features.map((feature) => serializeOneFeature(feature));

  export const serializeFeatureList = (_action: Action, feature: Feature) => ({
    data: serializeOneFeature(feature),
  });
}
