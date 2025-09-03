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
  public async uploadFileToBucket(
    objectStream: Buffer,
    bucket: string,
    s3Path: string,
    contentType: string = 'image/png',
  ): Promise<any> {
    const params = {
      Bucket: bucket,
      Key: s3Path,
      Body: objectStream,
      ContentType: contentType,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, function (error: any, data: unknown) {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  }
}

const S3Service = new S3ServiceImpl();

export default S3Service;
