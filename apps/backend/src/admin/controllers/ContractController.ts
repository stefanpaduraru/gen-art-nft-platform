import {
  Authorized,
  Controller,
  Get,
  Param,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { ContractSerializer } from '@admin/serializers/ContractSerializer';
import { Service } from 'typedi';
import ContractService from '@admin/services/ContractService';
import { Roles } from '@common/entities/User';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/contracts')
export class ContractController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ContractSerializer.serializeList)
  async getActive() {
    return ContractService.getAll();
  }

  @Get('/:id')
  @Routing.UseInterceptor(ContractSerializer.serializeContractDetails)
  async getOne(@Param('id') id: number) {
    return ContractService.getContractDetails(id);
  }
}
