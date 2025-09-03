import { Project, ProjectTypes } from '@common/entities/Project';
import { ContractRepository } from '@common/repositories/ContractRepository';
import * as Bluebird from 'bluebird';
import ProjectService from './ProjectService';

class ContractServiceImpl {
  public getAll() {
    return ContractRepository.findAll();
  }

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

  public async getContractDetails(id: number) {
    const contract = await ContractRepository.findOneWhere(
      'contract.id = :id',
      { id },
      [
        ['contract.partner', 'partner'],
        ['contract.project', 'project'],
      ],
    );
    if (!contract) {
      return;
    }
    const templates = (contract?.project || []).filter(
      (p: Project) => p.type === ProjectTypes.Template,
    );
    if (!templates.length) {
      return contract;
    }
    await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        ProjectService.findAndInjectChainProjects(template),
      { concurrency: 1 },
    );

    await Bluebird.Promise.map(
      templates,
      (template: Project) =>
        ProjectService.findAndInjectProjectTokens(template),
      { concurrency: 1 },
    );
    contract.project = templates.map((template) => {
      template.contract = contract;
      return template;
    });

    return contract;
  }
}

const ContractService = new ContractServiceImpl();
export default ContractService;
