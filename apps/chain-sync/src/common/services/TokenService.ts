import { ProjectType } from '@common/entities/Project';
import { TokenRepository } from '@common/repositories/TokenRepository';

class TokenServiceImpl {
  public async getTokenByProjectMainnetId(
    tokenId: number,
    projectId: number,
    contractId: number,
  ) {
    return TokenRepository.findOneWhere(
      `token = :tokenId AND project.chainId = :projectId AND
      contract.id = :contractId AND project.type = :projectType`,
      {
        tokenId: tokenId,
        projectId: projectId,
        contractId: contractId,
        projectType: ProjectType.Mainnet,
      },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ],
    );
  }

  public async getTokenByProjectTestnetId(
    tokenId: number,
    projectId: number,
    contractId: number,
  ) {
    return TokenRepository.findOneWhere(
      `token = :tokenId AND project.chainId = :projectId AND
      contract.id = :contractId AND project.type = :projectType`,
      {
        tokenId: tokenId,
        projectId: projectId,
        contractId: contractId,
        projectType: ProjectType.Testnet,
      },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ],
    );
  }

  public async getUnRenderedTokens() {
    return TokenRepository.findManyWhere(
      `rendered = :rendered`,
      {
        rendered: 0,
        isTestnet: 0,
      },
      [
        ['token.project', 'project'],
        ['project.contract', 'contract'],
      ],
    );
  }
}

const TokenService = new TokenServiceImpl();
export default TokenService;
