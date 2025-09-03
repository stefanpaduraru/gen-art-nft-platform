import { Token } from '@common/entities/Token';
import { logger } from '@common/services/Logger';
import { Network } from '@common/types/Network';
import { Contract } from '@common/entities/Contract';
import S3Service from './S3Service';
import * as config from '@config/config';
import TraitService from './TraitService';
import { TokenRepository } from '@common/repositories/TokenRepository';
import sharp from 'sharp';
import { Project } from '@common/entities/Project';
import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import PuppeteerService from './PuppeeterService';

class RenderServiceImpl {
  render = async (
    token: Token,
    network: Network,
    contract: Contract,
    project: Project,
  ) => {
    let currentGallery: MintoriaGallery = MintoriaGalleries.Selected;
    if (contract.slug === 'selected') {
      currentGallery = MintoriaGalleries.Selected;
    } else if (contract.slug === 'open-world') {
      currentGallery = MintoriaGalleries.OpenWorld;
    }
    logger.info('token render', {
      token: token.token,
      tokenId: token.id,
      gallery: currentGallery,
      network,
    });

    let data;
    try {
      data = await PuppeteerService.renderToken(
        token,
        network,
        project,
        currentGallery,
      );
    } catch (e) {
      logger.error('Could not render token', { error: e });
    }
    if (!data) {
      logger.error('Could not render token');
      return;
    }

    // update traits
    const traits = data.features;
    if (traits && Object.keys(traits).length) {
      TraitService.updateTokenTraits(token.id, traits);
    }

    if (config.AWS_S3_BUCKET_TOKEN && data.imageData) {
      const tokenPath = `${contract.id}/${project.id}/${token.token}`;
      logger.info('token upload', {
        token: token.token,
        tokenId: token.id,
        gallery: currentGallery,
        network,
        imgURL: `${config.AWS_S3_BUCKET_TOKEN}/${tokenPath}.png`,
      });

      await S3Service.uploadFileToBucket(
        Buffer.from(data.imageData, 'base64'),
        config.AWS_S3_BUCKET_TOKEN,
        `${tokenPath}.png`,
        'image/png',
      );

      const thumb = await sharp(Buffer.from(data.imageData, 'base64'))
        .toFormat('png')
        .resize({ width: 320, fit: sharp.fit.contain })
        .png({ quality: 100 })
        .toBuffer();

      await S3Service.uploadFileToBucket(
        thumb,
        config.AWS_S3_BUCKET_TOKEN,
        `${tokenPath}.thumb.png`,
        'image/png',
      );

      logger.info('token rendered', {
        token: token.token,
        tokenId: token.id,
        gallery: currentGallery,
        network,
      });
      TokenRepository.updateOne(token.id, { rendered: true });
    }

    return;
  };
}

const RenderService = new RenderServiceImpl();
export default RenderService;
