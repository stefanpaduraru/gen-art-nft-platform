import { ExceptionGroups } from "../ExceptionGroups";

import { user } from "./User";
import { generic } from "./Generic";

export const Definitions = {
  generic,
  user,
};

export type ExceptionDefinitionsGroup<K extends ExceptionGroups> =
  typeof Definitions[K];

type ExceptionsDefinitions = {
  [K in ExceptionGroups]: ExceptionDefinitionsGroup<K>;
};

export const ExceptionDefinitions: ExceptionsDefinitions = Definitions;
