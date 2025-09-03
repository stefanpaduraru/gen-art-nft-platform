import {
  Authorized,
  Controller,
  Get,
  Param,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { Service } from 'typedi';
import { Roles } from '@common/entities/User';
import { UserSerializer } from '@admin/serializers/UserSerializer';
import UserService from '@admin/services/UserService';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/users')
export class UserController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(UserSerializer.serializeUsers)
  async getActive() {
    return UserService.getAllActive();
  }

  @Get('/:id')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(UserSerializer.serializeUser)
  async getUserDetails(@Param('id') id: number) {
    return UserService.getUserDetails(id);
  }
}
