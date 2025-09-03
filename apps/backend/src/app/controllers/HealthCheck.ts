import { dbConnectionManager } from '@common/dbConnectionManager';
import { Routing } from '@common/integrations';
import { ServiceUnavailable } from '@common/integrations/Errors/ServiceUnavailable';
import { HTTP } from '@common/utils/HTTPCodes';
import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller('/health-check')
export class HealthCheckController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  async Healthcheck() {
    try {
      const connection = await dbConnectionManager.awaitConnection();
      if (!connection.isConnected) {
        throw new ServiceUnavailable('Unavailable');
      }
      return { status: 'OK' };
    } catch (e) {
      throw new ServiceUnavailable('Unavailable');
    }
  }
}
