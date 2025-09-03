import { ProjectType } from '@common/entities/Project';
import { ProjectRepository } from '@common/repositories/ProjectRepository';

class ProjectServiceImpl {
  public async getProjectByMainnetId(
    mainnetId: number,
    contractAddress: string,
  ) {
    return ProjectRepository.findOneWhere(
      'project.chainId = :mainnetId and contract.mainnetAddress = :contractAddress AND project.type = :projectType',
      {
        mainnetId,
        contractAddress: contractAddress,
        projectType: ProjectType.Mainnet,
      },
      [['project.contract', 'contract']],
    );
  }

  public async getProjectByTestnetId(
    testnetId: number,
    contractAddress: string,
  ) {
    return ProjectRepository.findOneWhere(
      'project.chainId = :testnetId and contract.testnetAddress = :contractAddress AND project.type = :projectType',
      {
        testnetId,
        contractAddress: contractAddress,
        projectType: ProjectType.Testnet,
      },
      [['project.contract', 'contract']],
    );
  }
}

const ProjectService = new ProjectServiceImpl();
export default ProjectService;
