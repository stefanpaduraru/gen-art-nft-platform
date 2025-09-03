import { ExceptionDefinition } from './Definitions/ExceptionDefinition';
import { ExceptionPayloads } from './Payloads';
import { ExceptionGroups } from './ExceptionGroups';
import { HttpError } from 'routing-controllers';

export interface ExceptionFactoryInterface {
  create<G extends ExceptionGroups>(
    exceptionData: ExceptionDefinition<G>,
    requesterId: number,
    payload?: ExceptionPayloads<G>,
  ): HttpError;
}
