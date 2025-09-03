import { ExceptionGroups } from '@common/integrations/Exceptions/ExceptionGroups';

export type ExceptionDefinition<T extends ExceptionGroups> = {
  group?: T;
  httpCode: number;
  type: string;
  publicMessage: string;
};
