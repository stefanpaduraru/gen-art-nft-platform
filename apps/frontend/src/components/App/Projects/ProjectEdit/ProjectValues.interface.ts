import { Feature, OptionalProjectMetadata } from "../../../../types/project";

type ProjectValues = {
  name: string;
  description: string;
  website: string;
  maxIterations: number | string;
  pricePerTokenInEth: string;
  startingAt: Date;
  license: string;
  scriptType: string;
  script: string;
  aspectRatio: string;
  active: boolean;
  paused: boolean;
  locked: boolean;
  deployed: boolean;
  useStorage: boolean;
  features: Feature[];
  newLabel: string;
  metadata: OptionalProjectMetadata;
};

export default ProjectValues;
