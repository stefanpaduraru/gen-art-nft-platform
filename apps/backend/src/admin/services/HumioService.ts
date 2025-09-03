import Humio from 'humio';
import * as config from '@config/config';
import { StatusFrequency } from '@common/types/Status';

class HumioClientImpl {
  public client: any;

  public constructor() {
    this.client = new Humio({
      apiToken: config.HUMIO_API_TOKEN,
      ingestToken: config.HUMIO_INGEST_TOKEN,
      host: 'cloud.community.humio.com',
      port: 443,
      basePath: '',
      repository: config.HUMIO_REPOSITORY,
    });
  }

  public async getLogs(frequency: StatusFrequency) {
    if (!this.client) return;
    return this.client
      .run({
        queryString:
          'message not "HTTP GET /health-check" AND message not "HTTP GET /admin/status" AND message not "HTTP GET /admin/stats"',
        start: frequency,
        isLive: false,
      })
      .then((result: any) => {
        if (result.status === 'success') {
          return result.data.events || [];
        } else {
          console.error('err', 'Search Error', result.error);
          return [];
        }
      })
      .catch('catch', console.error);
  }
}

const HumioClient = new HumioClientImpl();

export default HumioClient;
