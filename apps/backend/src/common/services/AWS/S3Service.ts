import * as aws from 'aws-sdk';
import * as config from '@config/config';

class S3ServiceImpl {
  public s3: aws.S3;

  public constructor() {
    this.s3 = new aws.S3({
      accessKeyId: config.AWS_IAM_USER_KEY,
      secretAccessKey: config.AWS_IAM_USER_SECRET,
    });
  }

  public async getObjectURL(key: string, bucket: string) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    return new Promise((resolve, reject) =>
      this.s3.getSignedUrl('getObject', params, async (e, url) => {
        if (e) {
          reject(e);
        }
        resolve(url); // return the url
      }),
    );
  }
}

const S3Service = new S3ServiceImpl();

export default S3Service;
