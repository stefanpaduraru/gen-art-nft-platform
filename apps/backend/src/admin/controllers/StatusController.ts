import {
  Authorized,
  Controller,
  Get,
  QueryParam,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { Service } from 'typedi';
import { Roles } from '@common/entities/User';
import StatusService from '@admin/services/StatusService';
import { StatusFrequency } from '@common/types/Status';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/status')
export class ContractController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  async getStatus(@QueryParam('frequency') frequency: string) {
    return StatusService.getStatus(
      (frequency as StatusFrequency) || '15m',
    );
  }

  @Get('/stats')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  async getNumbers() {
    return StatusService.getNumbers();
  }
}
