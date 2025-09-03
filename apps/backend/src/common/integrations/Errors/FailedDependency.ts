import { HttpError } from 'routing-controllers';
import { HTTP } from '@common/utils/HTTPCodes';

export class FailedDependency extends HttpError {
  constructor(message: string) {
    super(HTTP.FAILED_DEPENDENCY, message);
  }
}
