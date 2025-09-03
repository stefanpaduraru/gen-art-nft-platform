import { Token } from '@common/entities/Token';
import { Network } from '@common/types/Network';
import * as config from '@config/config';
import { Project } from '@common/entities/Project';
import puppeteer from 'puppeteer-core';
import { logger } from '@common/services/Logger';

class PuppeteerServiceImpl {
  renderToken = async (
    token: Token,
    network: Network,
    project: Project,
    gallery: string,
  ) => {
    let browser;
    try {
      browser = await puppeteer.connect({
        browserWSEndpoint: config.HEADLESS_URL,
        defaultViewport: { width: 2400, height: 2400 },
      });
    } catch (e) {
      logger.error('Puppeteer error:', e);
    }
    if (!browser) {
      logger.error('Cannot connect to headless renderer.');
      return;
    }

    const page = await browser.newPage();
    await page.setViewport({
      width: 2400,
      height: 2400,
      deviceScaleFactor: 1,
    });

    page.setDefaultNavigationTimeout(0);
    const tokenRenderURL = [
      config.BACKEND_URL,
      'token',
      gallery,
      network,
      token.token,
      'render',
    ].join('\\');
    await page.goto(tokenRenderURL);
    await page.waitForTimeout((project.renderDelay || 0) * 1000);

    const data = await page.evaluate(() => {
      const element:
        | (Element & {
            toDataURL: (type: string, quality: number) => string;
          })
        | null =
        document && document.querySelector
          ? document.querySelector('#defaultCanvas0')
          : null;
      if (!element) return { features: {}, imageData: '' };
      const features = getFeatures(tokenData) || {};
      const result = {
        features,
        imageData:
          element
            .toDataURL('image/png', 1.0)
            .replace('data:image/png;base64,', '') || '',
      };
      return result;
    });

    await browser.close();
    return data || null;
  };
}

const PuppeteerService = new PuppeteerServiceImpl();
export default PuppeteerService;

function getFeatures(_tokenData: any) {
  return {};
}

function tokenData(_tokenData: any) {
  throw new Error('Function not implemented.');
}
