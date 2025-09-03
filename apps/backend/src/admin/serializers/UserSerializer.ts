import { User } from '@common/entities/User';
import { Action } from 'routing-controllers';
import { PartnerSerializer } from './PartnerSerializer';
import { ProjectSerializer } from './ProjectSerializer';

// tslint:disable-next-line: no-namespace
export namespace UserSerializer {
  export const serializeUsers = (_action: Action, data: User[]) => {
    return data.map(serializeOneUser);
  };

  export const serializeUser = (_action: Action, user: User) => {
    return serializeExtendedUser(user);
  };

  export const serializeExtendedUser = (user: User) => ({
    name: user.name,
    address: user.address,
    id: user.id,
    createdAt: user.createdAt,
    partner: user.partner
      ? PartnerSerializer.serializePartner(user.partner)
      : null,
    projects: user.project
      ? user.project.map((p) =>
          ProjectSerializer.serializeFullProject(p),
        )
      : null,
  });

  export const serializeOneUser = (user: User) => ({
    name: user.name,
    address: user.address,
    id: user.id,
    createdAt: user.createdAt,
    partner: user.partner
      ? PartnerSerializer.serializePartner(user.partner)
      : null,
    projects: user.project
      ? ProjectSerializer.serializeShortList(user.project)
      : null,
  });

  export const serializeShortUser = (user: User) => ({
    name: user.name,
    address: user.address,
    id: user.id,
    createdAt: user.createdAt,
  });
}
