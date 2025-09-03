import {
  Controller,
  Get,
  Authorized,
  QueryParam,
  Param,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { Service } from 'typedi';
import { Roles } from '@common/entities/User';
import { TokenSerializer } from '@admin/serializers/TokenSerializer';
import TokenService from '@admin/services/TokenService';
import { Networks } from '@common/types/Network';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/tokens')
export class TokenController {
  @Get('/mainnet')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeDashTokenList)
  async getMainnet(@QueryParam('query') query: string) {
    return TokenService.getAllTokens(Networks.Mainnet, query);
  }

  @Get('/testnet')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeDashTokenList)
  async getTestnet(@QueryParam('query') query: string) {
    return TokenService.getAllTokens(Networks.Testnet, query);
  }

  @Get('/:id/render')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  async renderToken(@Param('id') id: number) {
    await TokenService.renderToken(id);
    return null;
  }
}
