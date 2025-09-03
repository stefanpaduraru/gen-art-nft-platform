import { ContractSerializer } from '@app/serializers/ContractSerializer';
import { Contract } from '@common/entities/Contract';
import { Partner } from '@common/entities/Partner';
import { Action } from 'routing-controllers';

// tslint:disable-next-line: no-namespace
export namespace PartnerSerializer {
  export const serializeList = (_action: Action, data: Partner[]) => {
    return data.map(serializePartner);
  };

  export const serializePartner = (partner: Partner) => ({
    id: partner.id,
    name: partner.name,
    createdAt: partner.createdAt,
  });

  export const serializePartnerDetails = (
    _action: Action,
    partner: Partner,
  ) => {
    return serializeExtendedPartner(partner);
  };

  export const serializeExtendedPartner = (partner: Partner) => ({
    id: partner.id,
    name: partner.name,
    createdAt: partner.createdAt,
    contracts:
      partner.contract &&
      partner.contract.map((contract: Contract) =>
        ContractSerializer.serializeExtendedContract(contract),
      ),
  });
}
