import { HttpError } from 'routing-controllers';
import { HTTP } from '@common/utils/HTTPCodes';

export class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super(HTTP.UNPROCESSABLE_ENTITY, message);
  }
}
