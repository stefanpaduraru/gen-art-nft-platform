import { UserSerializer } from '@app/serializers/UserSerializer';
import UserService from '@app/services/UserService';
import { Errors, Routing } from '@common/integrations';
import { AuthorizationService } from '@common/services/Authorization/AuthorizationService';
import { HTTP } from '@common/utils/HTTPCodes';
import { json } from 'body-parser';
import {
  Controller,
  Post,
  Body,
  UseBefore,
  UseInterceptor,
  Get,
  Param,
} from 'routing-controllers';
import { Service } from 'typedi';
import { toChecksumAddress } from 'ethereum-checksum-address';

@Service()
@Controller('/users')
export class UserController {
  @Post('/authenticate')
  @UseBefore(json())
  @Routing.HttpCode(HTTP.OK)
  @UseInterceptor(UserSerializer.serializeUser)
  async Authenticate(@Body() data: { token: string }) {
    const user = await AuthorizationService.authorize(data.token);
    if (!user) {
      return UserService.insertUserFromToken(data.token);
    }
    return user;
  }

  @Get('/artists')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(UserSerializer.serializeArtists)
  async getArtists() {
    const artists = await UserService.getArtists();

    return artists || [];
  }

  @Get('/:address')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(UserSerializer.serializeShortUser)
  async getUser(@Param('address') address: string) {
    const currentAddress = toChecksumAddress(address);
    return UserService.getPublicUserByAddress(currentAddress);
  }

  @Post('/:address')
  @UseBefore(json())
  @Routing.HttpCode(HTTP.OK)
  @Routing.UseInterceptor(UserSerializer.serializeUser)
  async UpdateBio(
    @Param('address') address: string,
    @Body() data: { name?: string; bio?: string },
  ) {
    const currentAddress = toChecksumAddress(address);
    const user = await UserService.getUserByAddress(currentAddress);
    if (!user) {
      throw new Errors.NotFound('User not found');
    }

    await UserService.updateUser(user.id, data);
    return UserService.getUserByAddress(currentAddress);
  }
}
