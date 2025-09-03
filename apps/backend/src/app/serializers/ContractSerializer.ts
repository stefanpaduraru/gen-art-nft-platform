import { Contract } from '@common/entities/Contract';
import { ProjectSerializer } from './ProjectSerializer';

// tslint:disable-next-line: no-namespace
export namespace ContractSerializer {
  export const serializeShortContract = (contract: Contract) => {
    return {
      name: contract.name,
      address: contract.mainnetAddress,
      testnetAddress: contract.testnetAddress,
      id: contract.id,
      type: contract.type,
    };
  };
  export const serializeExtendedContract = (contract: Contract) => {
    return {
      name: contract.name,
      address: contract.mainnetAddress,
      testnetAddress: contract.testnetAddress,
      id: contract.id,
      type: contract.type,
      projects:
        contract.project &&
        contract.project.map((project) =>
          ProjectSerializer.serializeFullProject(project),
        ),
    };
  };
}
