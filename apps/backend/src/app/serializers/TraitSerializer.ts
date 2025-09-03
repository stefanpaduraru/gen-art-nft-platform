import { Trait } from '@common/entities/Trait';
import { Action } from 'routing-controllers';

// tslint:disable-next-line: no-namespace
export namespace TraitSerializer {
  export const serializeOneTrait = (trait: Trait) => ({
    id: trait.id,
    name: trait.name,
    value: trait.value,
    rarityScore: trait.rarityScore,
    rarityCount: trait.rarityCount,
  });

  export const serializeTraits = (traits: Trait[]) =>
    traits.map((trait) => serializeOneTrait(trait));

  export const serializeTrait = (_action: Action, trait: Trait) => ({
    data: serializeOneTrait(trait),
  });
}
