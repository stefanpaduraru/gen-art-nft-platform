import { ExtendedProject, Project } from '@common/entities/Project';
import { Action } from 'routing-controllers';
import { ContractSerializer } from './ContractSerializer';
import { CollectionSerializer } from './CollectionSerializer';
import { FeatureSerializer } from './FeatureSerializer';
import { TokenSerializer } from './TokenSerializer';
import { UserSerializer } from './UserSerializer';
import { TransferRequestSerializer } from './TransferRequestSerializer';

// tslint:disable-next-line: no-namespace
export namespace ProjectSerializer {
  export const serializeShortProjectList = (
    _action: Action,
    data: Project[],
  ) => {
    return data.map(serializeShortProject);
  };

  export const serializeShortList = (data: Project[]) => {
    return data.map(serializeShortProject);
  };
  export const serializeFullProjectList = (
    _action: Action,
    data: Project[],
  ) => {
    return data.map(serializeFullProject);
  };

  export const serializeShortProject = (
    project: ExtendedProject,
  ) => ({
    id: project.id,
    type: project.type,
    testnetId: project.testnetProject?.id,
    mainnetId: project.mainnetProject?.id,
    name: project.name,
    artist: project.user?.name || project.artist,
    description: project.description,
    website: project.website,
    license: project.license,
    featuredToken: project.featuredTokenId,
    active: project.active,
    paused: project.paused,
    locked: project.locked,
    startingAt: project.startingAt,
    isCompleted: project.isCompleted(),
    isDeployed: project.isDeployed(),
    isMainnet: project.isMainnet(),
    isTestnet: project.isTestnet(),
    completedAt: project.completedAt,
    iterations: project.iterations,
    maxIterations: project.maxIterations,
    pricePerTokenInWei: project.pricePerTokenInWei,
    tokenURL: project.tokenURL(),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  });

  export const serializeShortProjectWithContract = (
    project: ExtendedProject,
  ) => ({
    ...serializeShortProject(project),
    contract: project.contract
      ? ContractSerializer.serializeContract(project.contract)
      : null,
    user: project.user
      ? UserSerializer.serializeShortUser(project.user)
      : null,
  });

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
      createdAt: project.createdAt,
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
      transferRequests: project.transferRequests
        ? TransferRequestSerializer.serializeTransferRequests(
            project.transferRequests,
          )
        : null,
      features: FeatureSerializer.serializeFeatures(
        project.features || [],
      ),
      contract:
        project.contract &&
        ContractSerializer.serializeContract(project.contract),
      user:
        project.user && UserSerializer.serializeOneUser(project.user),
      tokens:
        project.token &&
        project.contract &&
        TokenSerializer.serializeTokensWithImages(
          project.token,
          project,
          project.contract,
        ),
    };
  };

  export const serializeProjectDetails = (
    _action: Action,
    data: ExtendedProject,
  ) => {
    return {
      ...serializeFullProject(data),
      transferRequests: data.transferRequests
        ? TransferRequestSerializer.serializeTransferRequests(
            data.transferRequests,
          )
        : null,
      contract: data.contract
        ? ContractSerializer.serializeContract(data.contract)
        : null,
      collection: data.collection
        ? CollectionSerializer.serializeShortCollection(
            data.collection,
          )
        : null,
      features: data.features
        ? FeatureSerializer.serializeFeatures(data.features)
        : null,
      tokens: data.token
        ? TokenSerializer.serializeTokens(data.token)
        : null,
      user: data.user
        ? UserSerializer.serializeOneUser(data.user)
        : null,
    };
  };
}
