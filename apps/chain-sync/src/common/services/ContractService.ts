import { ContractRepository } from '@common/repositories/ContractRepository';

class ContractServiceImpl {
  public getCoreContractsForActivePartners() {
    return ContractRepository.findManyWhere(
      'contract.type = :type and partner.active = :active and contract.mainnetAddress IS NOT NULL',
      { type: 'core', active: true },
      [['contract.partner', 'partner']],
    );
  }

  public async getContractDetails(id: number) {
    return ContractRepository.findOneWhere(
      'contract.id = :id',
      { id },
      [
        ['contract.partner', 'partner'],
        ['contract.project', 'project'],
        ['project.token', 'token'],
      ],
    );
  }

  public async getContractByMainnetAddress(address: string) {
    return ContractRepository.findOneWhere(
      'contract.mainnetAddress = :address',
      { address },
      [],
    );
  }

  public async getContractByTestnetAddress(address: string) {
    return ContractRepository.findOneWhere(
      'contract.testnetAddress = :address',
      { address },
      [],
    );
  }
}

const ContractService = new ContractServiceImpl();
export default ContractService;
