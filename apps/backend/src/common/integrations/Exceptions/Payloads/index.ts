import { GenericPayloads } from "./Generic";
import { UserPayloads } from "./User";

export type ExceptionPayloadTypes = {
  generic: GenericPayloads;
  user: UserPayloads;
};

export type ExceptionPayloads<G extends keyof ExceptionPayloadTypes> =
  ExceptionPayloadTypes[G][keyof ExceptionPayloadTypes[G]];
