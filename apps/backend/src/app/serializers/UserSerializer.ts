import { TokenWithProject } from '@common/entities/Token';
import { Artist, Roles, User } from '@common/entities/User';
import { Action } from 'routing-controllers';
import { ProjectSerializer } from './ProjectSerializer';
import { TokenSerializer } from './TokenSerializer';
import { UserTokenSerializer } from './UserTokenSerializer';

// tslint:disable-next-line: no-namespace
export namespace UserSerializer {
  export const serializeArtists = (
    _action: Action,
    data: (User & { tokens: TokenWithProject[] })[],
  ) => {
    return data.map(serializeArtist);
  };

  export const serializeUser = (_action: Action, user: User) => {
    return serializeOneUser(user);
  };

  export const serializeArtist = (user: Artist) => ({
    name: user.name,
    address: user.address,
    bio: user.bio,
    createdAt: user.createdAt,
    projects: user.project
      ? user.project.map((p) =>
          ProjectSerializer.serializeListProject(p),
        )
      : null,
    projectCount: user.projectCount,
    featuredToken:
      user.featuredToken &&
      user.featuredToken.project &&
      user.featuredToken.project.contract &&
      TokenSerializer.serializeTokenWithImage(
        user.featuredToken,
        user.featuredToken.project,
        user.featuredToken.project.contract,
      ),
  });

  export const serializePublicUser = (
    _action: Action,
    user: User,
  ) => {
    return serializeOneUser(user);
  };

  export const serializeOneUser = (user: User) => ({
    id: user.id,
    name: user.name,
    address: user.address,
    isAdmin: (user.roles || []).includes(Roles.ADMIN),
    isOperator: (user.roles || []).includes(Roles.OPERATOR),
    isMintoriaStaff:
      (user.roles || []).includes(Roles.ADMIN) ||
      (user.roles || []).includes(Roles.OPERATOR),
    partner: {
      id: user.partner?.id,
      name: user.partner?.name,
    },
    createdAt: user.createdAt,
  });

  export const serializeShortUser = (
    _action: Action,
    user: User & { tokens: TokenWithProject[] },
  ) => ({
    name: user.name,
    address: user.address,
    bio: user.bio,
    createdAt: user.createdAt,
    projects: user.project
      ? user.project.map((p) =>
          ProjectSerializer.serializeFullProject(p),
        )
      : null,
    tokens: user.tokens
      ? user.tokens.map((t: TokenWithProject) =>
          t.project.contract
            ? UserTokenSerializer.serializeUserTokenWithImage(
                t,
                t.project.mainnetProject ||
                  t.project.testnetProject ||
                  t.project,
                t.project.contract,
              )
            : null,
        )
      : null,
  });
}
