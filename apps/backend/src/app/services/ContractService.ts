import { ContractRepository } from '@common/repositories/ContractRepository';

class ContractServiceImpl {
  public async getMintoriaSelected() {
    return ContractRepository.findOneWhere('contract.name = :name', {
      name: 'Mintoria Selected',
    });
  }

  public async getMintoriaOpenworld() {
    return ContractRepository.findOneWhere('contract.name = :name', {
      name: 'Mintoria Open World',
    });
  }
}

const ContractService = new ContractServiceImpl();
export default ContractService;
