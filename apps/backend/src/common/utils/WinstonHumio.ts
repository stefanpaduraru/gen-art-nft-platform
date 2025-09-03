import Transport, { TransportStreamOptions } from 'winston-transport';
import fetch from 'node-fetch';

const API_BASE_URL = 'https://cloud.community.humio.com';
const UNSTRUCTURE_API_ENDPOINT = '/api/v1/ingest/humio-unstructured';

export interface HumioTransportOptions
  extends TransportStreamOptions {
  ingestToken: string;
  callback?: (err?: Error) => void;
  tags?: { [key: string]: string };
}

export class HumioError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export default class HumioTransport extends Transport {
  private options: HumioTransportOptions;

  constructor(options: HumioTransportOptions) {
    super(options);
    this.options = options;
  }

  public log(info: any, callback: () => void): any {
    setImmediate(() => this.emit('logged', info));

    const body: any = {
      messages: [JSON.stringify(info)],
    };

    if (this.options.tags) {
      body.tags = this.options.tags;
    }
    this.sendIngestRequest(UNSTRUCTURE_API_ENDPOINT, [body]);

    callback();
  }

  private async sendIngestRequest(
    endpoint: string,
    requestBody: any,
  ) {
    try {
      const res = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.options.ingestToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (this.options.callback) {
        if (res.status >= 400) {
          const text = await res.text();
          this.options.callback(new HumioError(text, res.status));
        } else {
          this.options.callback();
        }
      }
    } catch (err: any) {
      if (this.options.callback) {
        this.options.callback(err);
      }
    }
  }
}
