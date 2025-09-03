import { TokenSerializer } from '@app/serializers/TokenSerializer';
import TokenService from '@app/services/TokenService';
import { Routing } from '@common/integrations';
import { TokenRepository } from '@common/repositories/TokenRepository';
import {
  MintoriaGalleries,
  MintoriaGallery,
  MintoriaGalleryTitles,
} from '@common/types/Galleries';
import { Network, Networks } from '@common/types/Network';
import { HTTP } from '@common/utils/HTTPCodes';
import {
  Controller,
  Get,
  NotFoundError,
  Param,
  Render,
} from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller('/token')
export class TokenController {
  @Get('/:gallery/:id/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeAPIToken)
  async getExternalMainnetToken(
    @Param('id') tokenId: number,
    @Param('gallery') gallery: string,
  ) {
    const projectId = Math.floor(tokenId / 100000);
    const currentNetwork = Networks.Mainnet;
    let currentGallery: MintoriaGallery;
    if (gallery === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
    } else if (gallery === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
    } else {
      throw new NotFoundError('Token not found');
    }

    const token =
      await TokenService.getFullTokenByIdNetworkAndGallery(
        tokenId,
        projectId,
        currentNetwork,
        currentGallery,
      );

    if (!token) {
      throw new NotFoundError('Token not found');
    }

    return { ...token, gallery: currentGallery, currentNetwork };
  }

  @Get('/:gallery/testnet/:id/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeAPIToken)
  async getExternalTestnetToken(
    @Param('id') tokenId: number,
    @Param('gallery') gallery: string,
  ) {
    const projectId = Math.floor(tokenId / 100000);
    const currentNetwork = Networks.Testnet;
    let currentGallery: MintoriaGallery;
    if (gallery === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
    } else if (gallery === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
    } else {
      throw new NotFoundError('Token not found');
    }

    const token =
      await TokenService.getFullTokenByIdNetworkAndGallery(
        tokenId,
        projectId,
        currentNetwork,
        currentGallery,
      );

    if (!token) {
      throw new NotFoundError('Token not found');
    }

    return { ...token, gallery: currentGallery, currentNetwork };
  }

  @Get('/:gallery/:id/render')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Render('renderToken.ejs')
  async renderToken(
    @Param('id') tokenId: number,
    @Param('gallery') gallery: string,
  ) {
    const projectId = Math.floor(tokenId / 100000);
    const currentNetwork = Networks.Mainnet;
    let currentGallery: MintoriaGallery;
    let galleryTitle: string;
    if (gallery === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
      galleryTitle = MintoriaGalleryTitles.Selected;
    } else if (gallery === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
      galleryTitle = MintoriaGalleryTitles.OpenWorld;
    } else {
      throw new NotFoundError('Token not found');
    }

    const token =
      await TokenService.getFullTokenByIdNetworkAndGallery(
        tokenId,
        projectId,
        currentNetwork,
        currentGallery,
      );
    if (!token) {
      throw new NotFoundError('Token not found');
    }

    return { token, galleryTitle };
  }

  @Get('/:gallery/:network/:id/render')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Render('renderToken.ejs')
  async renderNetworkToken(
    @Param('id') tokenId: number,
    @Param('gallery') gallery: string,
    @Param('network') network: string,
  ) {
    const projectId = Math.floor(tokenId / 100000);
    let currentNetwork: Network;
    if (network === 'mainnet') {
      currentNetwork = Networks.Mainnet;
    } else if (network === 'testnet') {
      currentNetwork = Networks.Testnet;
    } else {
      return;
    }

    let galleryTitle: string;
    let currentGallery: MintoriaGallery;
    if (gallery === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
      galleryTitle = MintoriaGalleryTitles.Selected;
    } else if (gallery === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
      galleryTitle = MintoriaGalleryTitles.OpenWorld;
    } else {
      throw new NotFoundError('Token not found');
    }

    const token =
      await TokenService.getFullTokenByIdNetworkAndGallery(
        tokenId,
        projectId,
        currentNetwork,
        currentGallery,
      );
    if (!token) {
      throw new NotFoundError('Token not found');
    }

    return { token, galleryTitle };
  }

  @Get('/internal/:gallery/:network/:id/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeExtendedToken)
  async getToken(
    @Param('id') tokenId: number,
    @Param('gallery') gallery: string,
    @Param('network') network: string,
  ) {
    let currentNetwork: Network;
    if (network === 'mainnet') {
      currentNetwork = Networks.Mainnet;
    } else if (network === 'testnet') {
      currentNetwork = Networks.Testnet;
    } else {
      return;
    }
    let currentGallery: MintoriaGallery;
    if (gallery === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
    } else if (gallery === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
    } else {
      return;
    }

    const projectId = Math.floor(tokenId / 100000);

    const token =
      await TokenService.getFullTokenByIdNetworkAndGallery(
        tokenId,
        projectId,
        currentNetwork,
        currentGallery,
      );

    const rarityRank = await TokenRepository.getRarerTokensThan(
      token?.project?.id || 0,
      token?.rarityScore || 0,
    );
    if (!token) {
      throw new NotFoundError('Token not found');
    }

    return { ...token, rarityRank: rarityRank + 1 };
  }

  @Get('/feed')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(TokenSerializer.serializeTokenList)
  async getTokenFeed() {
    return TokenService.getRandomTokens();
  }
}
