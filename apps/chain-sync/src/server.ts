import 'tsconfig-paths/register';
import winston from 'winston';
import expressWinston from 'express-winston';
import {
  createLogger,
  getFormatOptions,
  getLoggerConsoleOptions,
} from '@common/services/Logger';
import { dbConnectionManager as databaseConnectionManager } from './dbConnectionManager';
import {
  EXECUTION_FREQUENCY,
  CALCULATE_RARITY,
  SYNC_TO_CHAIN,
  RENDER_TOKENS,
} from '@config/config';
import ContractService from '@common/services/ContractService';
import RarityService from '@common/services/RarityService';
import {
  processMainnetContracts,
  processTestnetContracts,
} from '@common/services/ContractProcessingService';
import TokenService from '@common/services/TokenService';
import RenderService from '@common/services/RenderService';
import { Networks } from '@common/types/Network';

const DEFAULT_EXECUTION_FREQUENCY = '5000';

const logger = createLogger(true);
expressWinston.logger({
  transports: [
    new winston.transports.Console(getLoggerConsoleOptions()),
  ],
  format: getFormatOptions(),
});

databaseConnectionManager
  .awaitConnection()
  .then(() => {
    logger.info('Starting function');
    setTimeoutFnc();
  })
  .catch((err) => {
    logger.error(err);
  });

let runCount = 0;
let lastRarityCheck = 0;

const setTimeoutFnc = async () => {
  if (CALCULATE_RARITY === 'true') {
    if (lastRarityCheck + 360 * 1000 < Date.now()) {
      logger.info(`Rarity calculation initiated`);
      await RarityService.calculateForMainnetProjects();
      lastRarityCheck = Date.now();
    }
  }
  if (runCount % 50 === 0) {
    logger.info(`Run #${runCount}`);
  }

  if (SYNC_TO_CHAIN === 'true') {
    const coreContracts =
      await ContractService.getCoreContractsForActivePartners();

    await processMainnetContracts(coreContracts);
    await processTestnetContracts(coreContracts);
  }

  if (RENDER_TOKENS === 'true') {
    const tokens = await TokenService.getUnRenderedTokens();

    await Promise.all(
      tokens.slice(0, 5).map(async (token) => {
        const network = !token.isTestnet
          ? Networks.Mainnet
          : Networks.Testnet;

        if (token.project.contract) {
          await RenderService.render(
            token,
            network,
            token.project.contract,
            token.project,
          );
        }
      }),
    );
  }

  setTimeout(
    setTimeoutFnc,
    parseInt(EXECUTION_FREQUENCY || DEFAULT_EXECUTION_FREQUENCY, 10),
  );

  runCount += 1;
};
