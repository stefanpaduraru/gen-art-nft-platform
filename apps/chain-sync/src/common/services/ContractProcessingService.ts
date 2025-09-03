import { Contract } from '@common/entities/Contract';
import { Network, Networks } from '@common/types/Network';
import Bluebird from 'bluebird';
import EventService from './EventService';
import Web3Service from './Web3Service';

const processContract = async (
  network: Network,
  contract: Contract,
) => {
  const address =
    network === Networks.Mainnet
      ? contract.mainnetAddress
      : contract.testnetAddress;

  const web3Service = new Web3Service(network, address);
  const eventService = new EventService(web3Service);
  const useBlock = 0;

  const updateProjectEvents =
    await web3Service.getPastUpdateProjectEvents(useBlock);
  await eventService.processUpdateProjectEvents(
    updateProjectEvents || [],
  );

  const mintEvents = await web3Service.getPastMintEvents(useBlock);
  await eventService.processMintEvents(mintEvents || []);

  const transferEvents = await web3Service.getPastTransferEvents(
    useBlock,
  );
  await eventService.processTransferEvents(transferEvents || []);
};

export const processMainnetContracts = async (
  contracts: Contract[],
) => {
  await Bluebird.Promise.map(
    contracts,
    (contract) => processContract(Networks.Mainnet, contract),
    { concurrency: 1 },
  );
};
export const processTestnetContracts = async (
  contracts: Contract[],
) => {
  await Bluebird.Promise.map(
    contracts,
    (contract) => processContract(Networks.Testnet, contract),
    { concurrency: 1 },
  );
};
