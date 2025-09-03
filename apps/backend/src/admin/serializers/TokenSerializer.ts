import { Token } from '@common/entities/Token';
import { Project } from '@common/entities/Project';
import { Action } from 'routing-controllers';
import { Contract } from '@common/entities/Contract';
import TokenService from '@admin/services/TokenService';
import { ProjectSerializer } from './ProjectSerializer';

// tslint:disable-next-line: no-namespace
export namespace TokenSerializer {
  export const serializeToken = (token: Token) => ({
    id: token.id,
    hash: token.hash,
    owner: token.owner,
    token: token.token,
    project: token.project,
  });

  export const serializeTokenWithImage = (
    token: Token,
    project: Project,
    contract: Contract,
  ) => ({
    id: token.id,
    hash: token.hash,
    owner: token.owner,
    token: token.token,
    txHash: token.txHash,
    imageURL: TokenService.getTokenImageURL(
      token,
      project.id,
      contract,
    ),
    createdAt: token.createdAt,
  });

  export const serializeTokens = (tokens: Token[]) =>
    tokens.map((token) => serializeToken(token));

  export const serializeDashTokens = (tokens: Token[]) =>
    tokens.map((token) =>
      token.project && token.project.contract
        ? {
            ...serializeTokenWithImage(
              token,
              token.project,
              token.project?.contract,
            ),
            project:
              ProjectSerializer.serializeShortProjectWithContract(
                token.project,
              ),
          }
        : null,
    );

  export const serializeTokensWithImages = (
    tokens: Token[],
    project: Project,
    contract: Contract,
  ) =>
    tokens.map((token) =>
      serializeTokenWithImage(token, project, contract),
    );

  export const serializeTokenList = (
    _action: Action,
    tokens: Token[],
  ) => {
    return serializeTokens(tokens);
  };

  export const serializeDashTokenList = (
    _action: Action,
    tokens: Token[],
  ) => {
    return serializeDashTokens(tokens);
  };
}
