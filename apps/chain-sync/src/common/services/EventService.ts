import Web3Service from '@common/services/Web3Service';
import { EventData } from 'web3-eth/node_modules/web3-eth-contract';
import { Token } from '@common/entities/Token';
import { TokenRepository } from '@common/repositories/TokenRepository';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { logger } from '@common/services/Logger';
import ProjectService from './ProjectService';
import Bluebird from 'bluebird';
import { Networks } from '@common/types/Network';
import TokenService from './TokenService';
import ContractService from './ContractService';
import { Contract } from '@common/entities/Contract';
import UserService from './UserService';
import { User } from '@common/entities/User';
import PartnerService from './PartnerService';

class EventService {
  private web3Service: Web3Service;

  constructor(web3Service: Web3Service) {
    this.web3Service = web3Service;
  }

  async processMintEvents(events: EventData[]) {
    await Bluebird.Promise.map(
      events,
      (event) => event && this.processMintEvent(event),
      { concurrency: 20 },
    );
  }

  async processUpdateProjectEvents(events: EventData[]) {
    const filteredEvents: EventData[] = [];
    events.forEach((event) => {
      const { _projectId } = event.returnValues;
      filteredEvents[_projectId] = event;
    });

    await Bluebird.Promise.map(
      filteredEvents,
      (event) => event && this.processUpdateProjectEvent(event),
      { concurrency: 10 },
    );
  }

  async processTransferEvents(events: EventData[]) {
    const filteredEvents: { [key: string]: EventData } = {};
    events.forEach((event) => {
      const { tokenId } = event.returnValues;
      if (tokenId) {
        filteredEvents[`${tokenId}`] = event;
      }
    });
    const eventList: EventData[] = [];
    for (const i in filteredEvents) {
      eventList.push(filteredEvents[i]);
    }

    await Bluebird.Promise.map(
      eventList,
      (event) => event && this.processTransferEvent(event),
      { concurrency: 10 },
    );
  }

  async processTransferEvent(event: EventData) {
    const contractAddress = event.address;
    const { tokenId, to } = event.returnValues;
    const network = this.web3Service.network;
    const projectId = Math.floor(tokenId / 100000);

    let contract: Contract | undefined;
    if (network === Networks.Mainnet) {
      contract = await ContractService.getContractByMainnetAddress(
        contractAddress,
      );
    } else {
      contract = await ContractService.getContractByTestnetAddress(
        contractAddress,
      );
    }
    if (!contract) {
      return;
    }

    let foundToken;
    if (network === Networks.Mainnet) {
      foundToken = await TokenService.getTokenByProjectMainnetId(
        tokenId,
        projectId,
        contract.id,
      );
    } else {
      foundToken = await TokenService.getTokenByProjectTestnetId(
        tokenId,
        projectId,
        contract.id,
      );
    }
    if (!foundToken) {
      return;
    }
    if (foundToken) {
      const updatedToken = { owner: to } as Token;

      if (to !== foundToken.owner) {
        logger.info('token transfer', {
          token: foundToken.token,
          tokenId: tokenId.id,
          to: to,
        });
        await TokenRepository.updateOne(foundToken.id, updatedToken);
      }
    }
  }

  async processMintEvent(event: EventData) {
    const contractAddress = event.address;
    const txHash = event.transactionHash;
    const { _to, _tokenId, _projectId } = event.returnValues;
    const network = this.web3Service.network;
    let foundToken;
    let contract: Contract | undefined;
    if (network === Networks.Mainnet) {
      contract = await ContractService.getContractByMainnetAddress(
        contractAddress,
      );
    } else {
      contract = await ContractService.getContractByTestnetAddress(
        contractAddress,
      );
    }
    if (!contract) {
      return;
    }

    if (network === Networks.Mainnet) {
      foundToken = await TokenService.getTokenByProjectMainnetId(
        _tokenId,
        _projectId,
        contract.id,
      );
    } else {
      foundToken = await TokenService.getTokenByProjectTestnetId(
        _tokenId,
        _projectId,
        contract.id,
      );
    }

    if (!foundToken) {
      // insert
      const { hash } = await this.web3Service.getTokenById(_tokenId);
      let project;
      if (network === Networks.Mainnet) {
        project = await ProjectService.getProjectByMainnetId(
          _projectId,
          contractAddress,
        );
      } else {
        project = await ProjectService.getProjectByTestnetId(
          _projectId,
          contractAddress,
        );
      }
      if (!project) {
        /* logger.error(
          `   Could not find project ${_projectId} of contract ${contractAddress}. Aborting ...`,
        ); */
        return;
      }

      const newToken = {
        owner: _to,
        token: _tokenId,
        hash: hash,
        project: project,
        isTestnet: network === Networks.Testnet,
        txHash: txHash,
        rendered: false,
      } as Token;

      logger.info('token insert', {
        token: _tokenId,
        projectId: project.id,
        network,
      });
      await TokenRepository.insertMany([newToken]);

      // insert user if not in user table
      const existingUser = await UserService.getUserByAddress(_to);
      const mintoria = await PartnerService.getMintoriaPartner();

      if (!existingUser) {
        const newUser = {
          partner: mintoria,
          name: 'Collector',
          address: _to,
        } as User;
        try {
          await UserService.insertUser(newUser);
        } catch (error: any) {
          logger.error(`Could not insert new user ${_to}`, error);
        }
      }
    }
  }

  async processUpdateProjectEvent(event: EventData) {
    const { _projectId } = event.returnValues;
    const contractAddress = event.address;
    const network = this.web3Service.network;
    let foundProject;

    if (network === Networks.Mainnet) {
      foundProject = await ProjectService.getProjectByMainnetId(
        _projectId,
        contractAddress,
      );
    } else {
      foundProject = await ProjectService.getProjectByTestnetId(
        _projectId,
        contractAddress,
      );
    }

    if (foundProject) {
      const projectDetails = await this.web3Service.getProjectDetails(
        _projectId,
      );

      const tokenDetails =
        await this.web3Service.getProjectTokenDetails(_projectId);

      const extraPaymentDetails =
        await this.web3Service.getProjectExtraPaymentDetails(
          _projectId,
        );

      const projectURI = await this.web3Service.getProjectURI(
        _projectId,
      );
      const { baseURI, baseIpfsURI, useStorage } = projectURI;

      const scriptDetails =
        await this.web3Service.getProjectScriptDetails(_projectId);
      const { scriptChunksCount, scriptMetadata } = scriptDetails;
      let script = '';

      if (scriptChunksCount > 0) {
        const idx = Array.from(
          { length: scriptChunksCount },
          (_, i) => i,
        );

        const chunks = await Bluebird.Promise.map(
          idx,
          (i) =>
            this.web3Service.getProjectScriptChunkByIndex(
              _projectId,
              i,
            ),
          { concurrency: 1 },
        );

        script = chunks.join('');
      }

      const {
        projectName,
        artist,
        description,
        website,
        license,
        paused,
        active,
        locked,
      } = projectDetails;
      const {
        iterations,
        maxIterations,
        pricePerTokenInWei,
        maxTokensPerAddress,
      } = tokenDetails;

      if (
        foundProject.name !== projectName ||
        foundProject.artist !== artist ||
        foundProject.description !== description ||
        foundProject.website !== website ||
        foundProject.iterations !== parseInt(iterations, 10) ||
        foundProject.maxIterations !== parseInt(maxIterations, 10) ||
        foundProject.pricePerTokenInWei !== pricePerTokenInWei ||
        foundProject.paused !== paused ||
        foundProject.active !== active ||
        foundProject.locked !== locked ||
        foundProject.maxTokensPerAddress !==
          parseInt(maxTokensPerAddress, 10) ||
        foundProject.collaboratorAddress !==
          extraPaymentDetails.collaboratorAddress ||
        foundProject.collaboratorPercentage !==
          parseInt(extraPaymentDetails.collaboratorPercentage, 10) ||
        foundProject.royaltyFeePercentage !==
          parseInt(extraPaymentDetails.royaltyFeePercentage, 10) ||
        foundProject.script != script ||
        foundProject.baseURI !== baseURI ||
        foundProject.baseIpfsURI !== baseIpfsURI ||
        foundProject.useStorage !== useStorage ||
        foundProject.metadata !== scriptMetadata
      ) {
        foundProject.name = projectName;
        foundProject.artist = artist;
        foundProject.description = description;
        foundProject.website = website;
        foundProject.license = license;
        foundProject.iterations = iterations;
        foundProject.maxIterations = maxIterations;
        foundProject.maxTokensPerAddress = maxTokensPerAddress;
        foundProject.pricePerTokenInWei = pricePerTokenInWei;
        foundProject.paused = paused;
        foundProject.active = active;
        foundProject.locked = locked;
        foundProject.collaboratorAddress =
          extraPaymentDetails.collaboratorAddress;
        foundProject.collaboratorPercentage =
          extraPaymentDetails.collaboratorPercentage;
        foundProject.royaltyFeePercentage =
          extraPaymentDetails.royaltyFeePercentage;
        foundProject.feePercentage = tokenDetails.feePercentage;

        foundProject.script = script;
        foundProject.baseURI = baseURI;
        foundProject.baseIpfsURI = baseIpfsURI;
        foundProject.useStorage = useStorage;
        foundProject.metadata = scriptMetadata;

        if (maxIterations === iterations) {
          foundProject.completedAt = new Date();
        }
        ProjectRepository.updateOne(foundProject.id, foundProject);
        logger.info('project update', {
          project: foundProject.name,
          id: foundProject.id,
        });
      }
    }
  }
}
export default EventService;
