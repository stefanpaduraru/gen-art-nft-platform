import { TraitRepository } from '@common/repositories/TraitRepository';
import { Trait } from '@common/entities/Trait';
import { TokenRepository } from '@common/repositories/TokenRepository';

class TraitServiceImpl {
  public async getTraitsByTokenId(tokenId: number) {
    // tslint:disable-next-line: no-console
    return TraitRepository.findManyWhere(
      `tokenId = :tokenId`,
      {
        tokenId: tokenId,
      },
      [],
    );
  }

  public async updateTokenTraits(
    tokenId: number,
    traits: { [key: string]: any },
  ) {
    const token = await TokenRepository.findById(tokenId);
    if (!token) {
      return;
    }

    const existingTraits = await this.getTraitsByTokenId(tokenId);
    if (existingTraits) {
      const deletedTraits = existingTraits.map((t) => ({
        ...t,
        isDeleted: true,
      }));
      await TraitRepository.updateMany(deletedTraits);
    }
    const newTraits = Object.keys(traits).map(
      (k) =>
        ({
          name: k,
          value: traits[k],
          token,
        } as unknown as Trait),
    );
    return TraitRepository.insertMany(newTraits);
  }
}

const TraitService = new TraitServiceImpl();
export default TraitService;
