import { ProjectTypes } from '@common/entities/Project';
import { TokenRepository } from '@common/repositories/TokenRepository';

import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import { ResponseWithMeta } from '@common/types/Meta';
import { Network, Networks } from '@common/types/Network';
import * as config from '@config/config';
import { Token } from '@common/entities/Token';
import { Contract } from '@common/entities/Contract';

class TokenServiceImpl {
  public async getTokensByProjectId(
    projectId: number,
    network: Network,
    gallery: MintoriaGallery,
  ) {
    return TokenRepository.findManyByProjectId(
      projectId,
      network,
      gallery,
    );
  }

  public async getAllTokensByProjectId(
    projectId: number,
    network: Network,
  ) {
    return TokenRepository.findManyWhere(
      `projectId = :projectId AND isTestnet = ${
        network === Networks.Testnet ? 1 : 0
      }`,
      {
        projectId,
      },
    );
  }

  public async getAllTokensByTemplateChainProjectId(
    projectId: number,
  ) {
    return TokenRepository.findManyWhere('projectId = :projectId', {
      projectId,
    });
  }

  public async getAllTokensMeta(
    projectId: number,
    network: Network,
    gallery: MintoriaGallery,
    page: number,
    perPage: number,
  ) {
    const count = await TokenRepository.getAllTokensByProjectCount(
      projectId,
      network,
      gallery,
    );
    const pages = Math.ceil(count / perPage);

    return {
      page,
      perPage,
      count: pages,
    } as ResponseWithMeta;
  }

  public async getFullTokenById(tokenId: number, projectId: number) {
    return TokenRepository.findOneWhere(
      `token = :token AND project.id = :projectId`,
      { token: tokenId, projectId },
      [
        ['token.trait', 'trait'],
        ['token.project', 'project'],
        ['project.collection', 'collection'],
        ['project.features', 'features'],
        ['project.user', 'user'],
        ['project.contract', 'contract'],
      ],
    );
  }

  public async getFullTokenByIdNetworkAndGallery(
    tokenId: number,
    projectId: number,
    network: Network,
    gallery: MintoriaGallery,
  ) {
    let where = `token = :token AND project.chainId = :projectId`;

    if (network === Networks.Mainnet) {
      where += ` AND project.type = '${ProjectTypes.Mainnet}'`;
    } else {
      where += ` AND project.type = '${ProjectTypes.Testnet}'`;
    }

    if (gallery === MintoriaGalleries.Selected) {
      where += ` AND contract.name = 'Mintoria Selected'`;
    } else {
      where += ` AND contract.name = 'Mintoria Open World'`;
    }

    return TokenRepository.findOneWhere(
      where,
      { token: tokenId, projectId },
      [
        ['token.trait', 'trait'],
        ['token.project', 'project'],
        ['project.collection', 'collection'],
        ['project.features', 'features'],
        ['project.user', 'user'],
        ['project.contract', 'contract'],
      ],
    );
  }

  public getTokenImageURL(
    token: Token,
    projectId: number,
    contract: Contract,
  ) {
    let baseURL = '';
    if (contract.mediaURL) {
      baseURL = contract.mediaURL;
    } else {
      baseURL = `https://s3.eu-central-1.amazonaws.com/${contract.awsBucket}/${contract.id}`;
    }

    const key = token.rendered
      ? `${projectId}/${token.token}.thumb.png`
      : 'placeholder.jpg';

    const url = `${baseURL}/${key}`;
    return url;
  }

  public getTokenLiveViewURL(token: Token, contract: Contract) {
    const network = token.isTestnet
      ? Networks.Testnet
      : Networks.Mainnet;
    const gallery =
      contract.name === 'Mintoria Selected'
        ? MintoriaGalleries.Selected
        : MintoriaGalleries.OpenWorld;
    const url = `${config.GENERATOR_URL}/token/${gallery}/${network}/${token.token}/render`;
    return url;
  }

  public async getTokensByOwner(address: string) {
    return TokenRepository.findManyWhere(
      `owner = :address AND isTestnet = 0 AND project.type = :type`,
      { address, type: ProjectTypes.Mainnet },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ],
    );
  }

  public async getRandomTokens(count: number = 10) {
    return TokenRepository.findRandomWithLimit(
      count,
      'token.isTestnet = :isTestnet',
      { isTestnet: 0 },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
        ['project.user', 'user'],
      ],
    );
  }
}

const TokenService = new TokenServiceImpl();
export default TokenService;
