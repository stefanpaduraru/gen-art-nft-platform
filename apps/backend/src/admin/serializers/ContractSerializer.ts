import { ProjectSerializer } from '@admin/serializers/ProjectSerializer';
import { Contract } from '@common/entities/Contract';
import { Action } from 'routing-controllers';
import { PartnerSerializer } from './PartnerSerializer';

// tslint:disable-next-line: no-namespace
export namespace ContractSerializer {
  export const serializeList = (
    _action: Action,
    data: Contract[],
  ) => {
    return data.map(serializeContract);
  };

  export const serializeContractDetails = (
    _action: Action,
    contract: Contract,
  ) => {
    return {
      id: contract.id,
      name: contract.name,
      createdAt: contract.createdAt,
      type: contract.type,
      address: contract.mainnetAddress,
      testnetAddress: contract.testnetAddress,
      partner:
        contract.partner &&
        PartnerSerializer.serializePartner(contract.partner),
      projects: contract.project && [
        ...contract.project.map((project) =>
          ProjectSerializer.serializeFullProject(project),
        ),
      ],
    };
  };

  export const serializeContract = (contract: Contract) => ({
    id: contract.id,
    name: contract.name,
    createdAt: contract.createdAt,
    type: contract.type,
    address: contract.mainnetAddress,
    testnetAddress: contract.testnetAddress,
  });
}
