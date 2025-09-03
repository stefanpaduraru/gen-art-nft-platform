import { Action } from 'routing-controllers';
import { Roles, User } from '@common/entities/User';
import Web3Token from 'web3-token';
import UserService from '@app/services/UserService';
import { Indexed } from '@common/interfaces/IdIndexable';
import { toChecksumAddress } from 'ethereum-checksum-address';

class AuthorizationServiceImpl {
  async authorizationChecker(
    action: Action,
    roles: Roles[],
  ): Promise<boolean> {
    /* const roleCheckingInstances: CustomRoleChecker<any>[] =
      roles.filter(
        (r) =>
          r !== null &&
          typeof r === 'object' &&
          (r as CustomRoleChecker<any>)?.check,
      ) as CustomRoleChecker<any>[];

    if (roleCheckingInstances.length) {
      try {
        if (
          (
            await Promise.all(
              roleCheckingInstances.map((r) => r.check(action)),
            )
          ).some(Boolean)
        ) {
          return true;
        }
      } catch (_) {
        return false;
      }
    }*/
    const authorization = action.request.headers.authorization;
    if (!authorization) {
      return false;
    }
    const token = `${authorization}`
      .replace('Bearer ', '')
      .replace('Basic ', '');
    if (!token) return false;

    const user = await this.authorize(token);

    if (!user) {
      return false;
    }

    try {
      const hasRequiredRoles =
        !roles.length ||
        roles.some((role) =>
          (user.roles || []).includes(role as Roles),
        );

      if (user?.blocked || !hasRequiredRoles) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async authorize(token: string): Promise<false | User> {
    if (!token) return false;

    try {
      const { address } = await Web3Token.verify(token);
      const currentAddress = toChecksumAddress(address);
      const user = await UserService.getUserByAddress(currentAddress);
      if (!user) return false;
      return user;
    } catch (e) {
      return false;
    }
  }

  async currentUserChecker(action: Action): Promise<User | boolean> {
    const user = await AuthorizationServiceImpl.getUserForAction(
      action,
    );

    if (!user) return false;

    return user;
  }

  private static async getUserForAction(
    action: Action,
  ): Promise<Indexed<User> | undefined> {
    const savedUser: Indexed<User> | undefined = action.request.user;
    if (savedUser) return savedUser;

    const token: string = (
      action?.request?.headers?.authorization || ''
    ).replace('Bearer ', '');

    if (!token) return undefined;
    try {
      const { address } = await Web3Token.verify(token);
      const currentAddress = toChecksumAddress(address);
      const user = await UserService.getUserByAddress(currentAddress);

      // eslint-disable-next-line no-param-reassign
      action.request.user = user;
      return user;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export const AuthorizationService = new AuthorizationServiceImpl();
