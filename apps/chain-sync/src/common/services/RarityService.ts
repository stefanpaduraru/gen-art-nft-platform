import { Project, ProjectType } from '@common/entities/Project';
import { Token } from '@common/entities/Token';
import { Trait } from '@common/entities/Trait';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { TokenRepository } from '@common/repositories/TokenRepository';
import { TraitRepository } from '@common/repositories/TraitRepository';
import { Network, Networks } from '@common/types/Network';
import { logger } from '@common/services/Logger';

class RarityServiceImpl {
  public constructor() {}

  public async calculateForMainnetProjects() {
    // project.maxIterations = project.iterations AND
    const projects = await ProjectRepository.findManyWhere(
      `project.active = 1 AND
      project.chainId > 0 AND
      project.maxIterations = project.iterations
      `,
      { projectType: ProjectType.Mainnet },
    );

    await Promise.all(
      (projects || []).map((project) =>
        this.calculateRarityForProject(project, Networks.Mainnet),
      ),
    );
  }

  public async calculateRarityForProject(
    project: Project,
    network: Network,
  ) {
    const tokens = await TokenRepository.getAllTokensByProjectId(
      project.id,
      network,
    );

    const tokensWithOutRarity = tokens.filter(
      (token) => token.rarityScore <= 0.001,
    );

    // don't continue if nothing to update
    if (!tokensWithOutRarity.length) {
      return;
    }

    const traitsMap = this.calculateTraitsMap(tokens);
    const tokenCount = tokens.length;
    let updatedTraits: Trait[] = [];

    const updatedTokens = tokens.map((token) => {
      if (!token || !token.trait) {
        return;
      }
      let tokenRarityScore = 0;
      const newTraits = (token.trait || []).map((trait) => {
        const count =
          traitsMap[trait.name] && traitsMap[trait.name][trait.value]
            ? traitsMap[trait.name][trait.value]
            : 1;
        const rarityScore = 1 / (count / tokenCount);
        tokenRarityScore += rarityScore;

        return {
          ...trait,
          rarityScore,
          rarityCount: count,
        };
      });
      updatedTraits = updatedTraits.concat(newTraits);

      return { id: token.id, rarityScore: tokenRarityScore } as Token;
    });

    logger.info('tokens rarity update', {
      projectId: project.id,
      length: updatedTokens.length,
    });
    const tokenPromises = updatedTokens.map(
      (token) => token && TokenRepository.updateOne(token?.id, token),
    );
    await Promise.all(tokenPromises);

    logger.info('trait rarity update', {
      projectId: project.id,
      length: updatedTraits.length,
    });

    const traitPromises = updatedTraits.map(
      (trait) => trait && TraitRepository.updateOne(trait.id, trait),
    );
    await Promise.all(traitPromises);
  }

  private calculateTraitsMap(tokens: Token[]) {
    let traitsMap: { [key: string]: any } = {};

    tokens.map((token) => {
      if (token && token.trait && token.trait.length) {
        token.trait.map((trait) => {
          if (!traitsMap[trait.name]) {
            traitsMap[trait.name] = {};
          }
          if (!traitsMap[trait.name][trait.value]) {
            traitsMap[trait.name][trait.value] = 0;
          }
          traitsMap[trait.name][trait.value] += 1;
        });
      }
    });

    return traitsMap;
  }
}

const RarityService = new RarityServiceImpl();

export default RarityService;
