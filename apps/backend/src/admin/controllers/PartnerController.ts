import {
  Authorized,
  Controller,
  Get,
  Param,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { PartnerSerializer } from '@admin/serializers/PartnerSerializer';
import { Service } from 'typedi';
import PartnerService from '@admin/services/PartnerService';
import { Roles } from '@common/entities/User';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/partners')
export class PartnerController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(PartnerSerializer.serializeList)
  async getActive() {
    return PartnerService.getAll();
  }

  @Get('/:id')
  @Routing.UseInterceptor(PartnerSerializer.serializePartnerDetails)
  async getOne(@Param('id') id: number) {
    return PartnerService.getPartnerDetails(id);
  }
}
