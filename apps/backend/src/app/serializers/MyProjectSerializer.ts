import {
  ExtendedProject,
  Project,
  ProjectTypes,
} from '@common/entities/Project';
import { Action } from 'routing-controllers';
import { ContractSerializer } from './ContractSerializer';
import { CollectionSerializer } from './CollectionSerializer';
import { FeatureSerializer } from './FeatureSerializer';
import { TokenSerializer } from './TokenSerializer';
import { UserSerializer } from './UserSerializer';
import { Contract } from '@common/entities/Contract';
import { TransferRequestSerializer } from './TransferRequestSerializer';

// tslint:disable-next-line: no-namespace
export namespace MyProjectSerializer {
  export const serializeMyProjects = (
    _action: Action,
    data: Project[],
  ) => {
    return data.map(serializeMyListProject);
  };

  export const serializeMyListProject = (
    project: ExtendedProject,
  ) => {
    const featuredToken = project.featuredToken();

    const serialisedFeaturedToken =
      featuredToken && project.contract
        ? TokenSerializer.serializeTokenWithImage(
            featuredToken,
            project,
            project.contract,
          )
        : null;

    return {
      id: project.id,
      type: project.type,
      testnetId: project.testnetProject?.id,
      mainnetId: project.mainnetProject?.id,
      chainId: project.chainId,
      testnetProject:
        project.testnetProject &&
        serializeMyListProject(project.testnetProject),
      mainnetProject:
        project.mainnetProject &&
        serializeMyListProject(project.mainnetProject),
      templateId: project.templateId,
      name: project.name,
      artist: project.user?.name || project.artist,
      description: project.description,
      website: project.website,
      license: project.license,
      featuredToken: serialisedFeaturedToken,
      active: project.active,
      paused: project.paused,
      locked: project.locked,
      startingAt: project.startingAt,
      isDeployed:
        !!project.testnetProject?.id || !!project.mainnetProject?.id,
      isMainnet: !!project.mainnetProject?.id,
      isTestnet:
        !!project.testnetProject?.id && !project.mainnetProject?.id,
      isCompleted: project.isCompleted(),
      completedAt: project.completedAt,
      iterations: project.iterations,
      maxIterations: project.maxIterations,
      pricePerTokenInWei: project.pricePerTokenInWei,
      contract:
        project.contract &&
        ContractSerializer.serializeShortContract(project.contract),
    };
  };

  export const serializeFullProject = (project: ExtendedProject) => {
    const featuredToken = project.featuredToken();
    const serialisedFeaturedToken =
      featuredToken && project.contract
        ? TokenSerializer.serializeTokenWithImage(
            featuredToken,
            project,
            project.contract,
          )
        : null;

    return {
      id: project.id,
      type: project.type,
      testnetId: project.testnetProject?.id,
      mainnetId: project.mainnetProject?.id,
      chainId: project.chainId,
      testnetProject:
        project.testnetProject &&
        serializeFullProject(project.testnetProject),
      mainnetProject:
        project.mainnetProject &&
        serializeFullProject(project.mainnetProject),
      templateId: project.templateId,
      name: project.name,
      artist: project.user?.name || project.artist,
      description: project.description,
      website: project.website,
      license: project.license,
      featuredToken: serialisedFeaturedToken,
      active: project.active,
      paused: project.paused,
      locked: project.locked,
      startingAt: project.startingAt,
      isDeployed:
        !!project.testnetProject?.id || !!project.mainnetProject?.id,
      isMainnet: !!project.mainnetProject?.id,
      isTestnet:
        !!project.testnetProject?.id && !project.mainnetProject?.id,
      isCompleted: project.isCompleted(),
      completedAt: project.completedAt,
      iterations: project.iterations,
      maxIterations: project.maxIterations,
      maxTokensPerAddress: project.maxTokensPerAddress,
      pricePerTokenInWei: project.pricePerTokenInWei,
      metadata: project.metadata,
      useStorage: project.useStorage,
      baseURI: project.baseURI,
      baseIpfsURI: project.baseIpfsURI,
      tokenURL: project.tokenURL(),
      script: project.script?.toString(),
      collaboratorAddress: project.collaboratorAddress,
      collaboratorPercentage: project.collaboratorPercentage,
      royaltyFeePercentage: project.royaltyFeePercentage,
      termsAccepted: project.termsAccepted,
      votes: project.votes,
      renderDelay: project.renderDelay,
      dropType: project.dropType,
      dropDetails: project.dropDetails,
      additionalDetails: project.additionalDetails,
      features: FeatureSerializer.serializeFeatures(
        project.features || [],
      ),
      contract:
        project.contract &&
        ContractSerializer.serializeShortContract(project.contract),
      tokens: project.token
        ? TokenSerializer.serializeTokens(project.token)
        : null,
    };
  };

  export const serializeControllerProjectDetails = (
    _action: Action,
    project: ExtendedProject,
  ) => serializeProjectDetails(project);

  export const serializeProjectDetails = (
    project: ExtendedProject,
  ) => {
    const featuredToken =
      project.type !== ProjectTypes.Template && project.featuredToken
        ? project.featuredToken()
        : null;
    const serialisedFeaturedToken =
      featuredToken && project.contract
        ? TokenSerializer.serializeTokenWithImage(
            featuredToken,
            project,
            project.contract,
          )
        : null;

    return {
      id: project.id,
      type: project.type,
      testnetId: project.testnetProject?.id,
      mainnetId: project.mainnetProject?.id,
      chainId: project.chainId,
      testnetProject:
        project.testnetProject &&
        serializeProjectDetails(project.testnetProject),
      mainnetProject:
        project.mainnetProject &&
        serializeProjectDetails(project.mainnetProject),
      metadata: project.metadata,
      templateId: project.templateId,
      name: project.name,
      artist: project.user?.name || project.artist,
      description: project.description,
      website: project.website,
      license: project.license,
      featuredToken: serialisedFeaturedToken,
      active: project.active,
      paused: project.paused,
      locked: project.locked,
      startingAt: project.startingAt,
      isDeployed:
        !!project.testnetProject?.id || !!project.mainnetProject?.id,
      isMainnet: !!project.mainnetProject?.id,
      isTestnet:
        !!project.testnetProject?.id && !project.mainnetProject?.id,
      isCompleted: project.isCompleted
        ? project.isCompleted()
        : false,
      completedAt: project.completedAt,
      iterations: project.iterations,
      maxIterations: project.maxIterations,
      maxTokensPerAddress: project.maxTokensPerAddress,
      pricePerTokenInWei: project.pricePerTokenInWei,
      votes: project.votes,
      script: project.script?.toString(),
      dropType: project.dropType,
      dropDetails: project.dropDetails,
      additionalDetails: project.additionalDetails,
      renderDelay: project.renderDelay,
      contract:
        project.contract &&
        ContractSerializer.serializeShortContract(project.contract),
      user: project.user
        ? UserSerializer.serializeOneUser(project.user)
        : null,
      tokens: project.token
        ? TokenSerializer.serializeTokens(project.token)
        : null,
    };
  };

  export const serializeMyProjectDetails = (
    _action: Action,
    data: ExtendedProject & { minterContract?: Contract },
  ) => {
    return {
      ...serializeProjectDetails(data),
      contract: data.contract
        ? ContractSerializer.serializeShortContract(data.contract)
        : null,
      minterContract: data.minterContract
        ? ContractSerializer.serializeShortContract(
            data.minterContract,
          )
        : null,
      collection: data.collection
        ? CollectionSerializer.serializeShortCollection(
            data.collection,
          )
        : null,
      user: data.user
        ? UserSerializer.serializeOneUser(data.user)
        : null,
      tokens:
        data.contract && data.token?.length
          ? data.token?.map(
              (token) =>
                data.contract &&
                TokenSerializer.serializeListTokenWithImage(
                  token,
                  data.mainnetProject || data.testnetProject || data,
                  data.contract,
                ),
            )
          : null,
    };
  };

  export const serializeProjectEdit = (
    _action: Action,
    data: ExtendedProject & { minterContract?: Contract },
  ) => {
    return {
      ...serializeFullProject(data),
      contract: data.contract
        ? ContractSerializer.serializeShortContract(data.contract)
        : null,
      transferRequests: data.transferRequests
        ? TransferRequestSerializer.serializeTransferRequests(
            data.transferRequests,
          )
        : null,
      minterContract: data.minterContract
        ? ContractSerializer.serializeShortContract(
            data.minterContract,
          )
        : null,
      collection: data.collection
        ? CollectionSerializer.serializeShortCollection(
            data.collection,
          )
        : null,
      features: data.features
        ? FeatureSerializer.serializeFeatures(data.features)
        : null,
      user: data.user
        ? UserSerializer.serializeOneUser(data.user)
        : null,
      tokens:
        data.contract && data.token?.length
          ? data.token?.map(
              (token) =>
                data.contract &&
                TokenSerializer.serializeListTokenWithImage(
                  token,
                  data.mainnetProject || data.testnetProject || data,
                  data.contract,
                ),
            )
          : null,
    };
  };

  export const serializeProjectWithContract = (project: Project) => ({
    id: project.id,
    chainId: project.chainId,
    name: project.name,
    artist: project.user?.name || project.artist,
    description: project.description,
    active: project.active,
    paused: project.paused,
    locked: project.locked,
    license: project.license,
    startingAt: project.startingAt,
    isDeployed: project.isDeployed(),
    isMainnet: project.isMainnet(),
    isTestnet: project.isTestnet(),
    isCompleted: project.isCompleted(),
    completedAt: project.completedAt,
    iterations: project.iterations,
    maxIterations: project.maxIterations,
    maxTokensPerAddress: project.maxTokensPerAddress,
    pricePerTokenInWei: project.pricePerTokenInWei,
    tokenURL: project.tokenURL(),
    script: project.script?.toString(),
    metadata: project.metadata,
    type: project.type,
    votes: project.votes,
    contract:
      project.contract &&
      ContractSerializer.serializeShortContract(project.contract),
    user:
      project.user && UserSerializer.serializeOneUser(project.user),
  });
}
