import { HttpError } from 'routing-controllers';
import { HTTP } from '@common/utils/HTTPCodes';

export class ServiceUnavailable extends HttpError {
  constructor(message: string) {
    super(HTTP.SERVICE_UNAVAILABLE, message);
  }
}
