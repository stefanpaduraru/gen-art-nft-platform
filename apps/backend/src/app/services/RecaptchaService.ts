import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

import * as config from '@config/config';
import { CaptchaAction } from '@common/types/CaptchaActions';

class RecaptchaServiceImpl {
  private key: string;
  private projectId: string;

  constructor(key = '', projectId = '') {
    this.key = key;
    this.projectId = projectId;
  }

  public async createAssessment(
    token: string,
    recaptchaAction: string,
  ) {
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(this.projectId);

    const request = {
      assessment: {
        event: {
          token,
          siteKey: this.key,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (
      !response ||
      !response.tokenProperties ||
      !response.riskAnalysis
    ) {
      return false;
    }

    if (!response.tokenProperties.valid) {
      return false;
    }

    if (response.tokenProperties.action === recaptchaAction) {
      return response.riskAnalysis.score;
    } else {
      return false;
    }
  }

  public async verify(token: string, action: CaptchaAction) {
    const score = await this.createAssessment(token, action);

    return score && score >= 0.75;
  }
}

const RecaptchaService = new RecaptchaServiceImpl(
  config.RECAPTCHA_KEY,
  config.RECAPTCHA_PROJECT_ID,
);
export default RecaptchaService;
