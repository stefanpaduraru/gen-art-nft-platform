import { HttpError } from 'routing-controllers';
import { HTTP } from '@common/utils/HTTPCodes';

export class BadGateway extends HttpError {
  constructor(message: string) {
    super(HTTP.BAD_GATEWAY, message);
  }
}
