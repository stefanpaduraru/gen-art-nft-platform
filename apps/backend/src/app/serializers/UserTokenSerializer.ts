import { Token } from '@common/entities/Token';
import TokenService from '@app/services/TokenService';
import { Contract } from '@common/entities/Contract';
import { Project } from '@common/entities/Project';

// tslint:disable-next-line: no-namespace
export namespace UserTokenSerializer {
  export const serializeUserTokenWithImage = (
    token: Token,
    project: Project,
    contract: Contract,
  ) => ({
    id: token.id,
    token: token.token,
    rendered: token.rendered,
    imageURL: TokenService.getTokenImageURL(
      token,
      project.id,
      contract,
    ),
    project: {
      id: project.id,
      contract: {
        name: contract.name,
      },
    },
  });
}
