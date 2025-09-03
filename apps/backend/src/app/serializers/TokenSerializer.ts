import {
  Token,
  TokenWithProject,
  TokenWithProjectAndRarity,
} from '@common/entities/Token';
import { Action } from 'routing-controllers';
import { ProjectSerializer } from './ProjectSerializer';
import * as config from '@config/config';
import TokenService from '@app/services/TokenService';
import { Contract } from '@common/entities/Contract';
import { Project } from '@common/entities/Project';
import { TraitSerializer } from './TraitSerializer';
import { MintoriaGallery } from '@common/types/Galleries';
import { Network } from '@common/types/Network';

// tslint:disable-next-line: no-namespace
export namespace TokenSerializer {
  export const serializeOneToken = (token: Token) => ({
    id: token.id,
    owner: token.owner,
    token: token.token,
    project: token.project
      ? ProjectSerializer.serializeProjectWithContract(token.project)
      : null,
  });
  export const serializeExtendedToken = (
    _action: Action,
    token: TokenWithProjectAndRarity,
  ) => ({
    id: token.id,
    hash: token.hash,
    owner: token.owner,
    token: token.token,
    txHash: token.txHash,
    rarityScore: token.rarityScore,
    rarityRank: token.rarityRank,
    imageURL:
      token.project &&
      token.project.contract &&
      TokenService.getTokenImageURL(
        token,
        token.project.id,
        token.project.contract,
      ),
    liveViewURL:
      token.project &&
      token.project.contract &&
      TokenService.getTokenLiveViewURL(token, token.project.contract),
    project: ProjectSerializer.serializeProjectWithContract(
      token.project,
    ),
    traits: TraitSerializer.serializeTraits(token.trait || []),
  });

  export const serializeOneExtendedToken = (
    token: TokenWithProject,
  ) => ({
    id: token.id,
    hash: token.hash,
    owner: token.owner,
    token: token.token,
    txHash: token.txHash,
    rarityScore: token.rarityScore,
    project: ProjectSerializer.serializeProjectWithContract(
      token.project,
    ),
  });

  export const serializeAPIToken = (
    _action: Action,
    token: Token & { gallery: MintoriaGallery } & {
      currentNetwork: Network;
    },
  ) => {
    if (!token) return;
    const name = `${token.project?.name} #${
      token.token % ((token.project?.chainId || 0) * 100000)
    }`;

    return {
      name: name,
      description: token?.project?.description,
      external_url: `${config.FRONT_CLIENT_URL}/token/${token.gallery}/${token.currentNetwork}/${token.token}`, // frontend
      image: token?.project?.contract
        ? TokenService.getTokenImageURL(
            token,
            token?.project?.id || 0,
            token?.project?.contract,
          )
        : null,
      animation_url: `${config.GENERATOR_URL}/token/${token.gallery}/${token.currentNetwork}/${token.token}/render`, // render
      artist: token.project?.artist,
      collection_name: `${token.project?.name} by ${token.project?.artist}`,

      attributes: (token.trait || []).map((trait) => ({
        trait_type: trait.name,
        value: trait.value,
      })),
      payout_address: token.project?.user?.address,
      royaltyInfo: {
        collaboratorAddress: token.project?.collaboratorAddress,
        collaboratorPercentage: token.project?.collaboratorPercentage,
        artistAddress: token.project?.user?.address,
        royaltyFee: token.project?.royaltyFeePercentage,
      },

      license: token.project?.license,
      platform: token.project?.contract?.name,
      projectId: token.project?.chainId,
      tokenId: token.token,
      website: token.project?.website,
      rarityScore: token.rarityScore,
    };
  };

  export const serializeTokens = (tokens: Token[]) =>
    tokens.map((token) => serializeOneToken(token));

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
    rarityScore: token.rarityScore,
  });

  export const serializeGalleryTokenWithImage = (
    token: Token,
    project: Project,
    contract: Contract,
  ) => ({
    id: token.id,

    token: token.token,
    imageURL: TokenService.getTokenImageURL(
      token,
      project.id,
      contract,
    ),
    rendered: token.rendered,
    rarityScore: token.rarityScore,
    createdAt: token.createdAt,
  });

  export const serializeListTokenWithImage = (
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
  });

  export const serializeTokenList = (
    _action: Action,
    tokens: Token[],
  ) => {
    return serializeTokens(tokens);
  };
}
