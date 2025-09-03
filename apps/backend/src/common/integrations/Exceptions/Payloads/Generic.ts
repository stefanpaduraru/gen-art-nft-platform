export type GenericPayloads = {
  badRequest: {};
  requiredParameter: {
    parameterName: string | string[];
  };
  invalidParameter: {
    parameterName: string | string[];
  };
  exceedsCharLimit: {
    parameterName: string | string[];
  };
  nonUniqueValues: {
    parameterName: string | string[];
  };
};
