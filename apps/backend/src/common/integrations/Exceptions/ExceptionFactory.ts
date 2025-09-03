import { logger } from "@common/services/Logger";
import { HttpError } from "routing-controllers";
import { ExceptionFactoryInterface } from "./ExceptionFactoryInterface";
import { ExceptionPayloads } from "./Payloads";
import { ExceptionDefinition } from "./Definitions/ExceptionDefinition";
import { getCallerInfo } from "./helper";
import { ExceptionGroups } from "./ExceptionGroups";

export class ExceptionFactoryImpl implements ExceptionFactoryInterface {
  create<G extends ExceptionGroups>(
    exceptionData: ExceptionDefinition<G>,
    requesterId?: number,
    payload?: ExceptionPayloads<G>
  ): HttpError {
    const caller = getCallerInfo();

    logger.error(exceptionData.type, { requesterId, ...payload, caller });
    return new HttpError(exceptionData.httpCode, exceptionData.publicMessage);
  }
}

export const ExceptionFactory = new ExceptionFactoryImpl();
