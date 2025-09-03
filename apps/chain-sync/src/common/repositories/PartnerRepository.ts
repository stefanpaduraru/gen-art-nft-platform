import { AbstractRepository } from "@common/repositories/shared/AbstractRepository";
import { Partner } from "@common/entities/Partner";

class PartnerRepositoryImpl extends AbstractRepository<Partner> {
  
}

export const PartnerRepository = new PartnerRepositoryImpl(
  Partner,
  "partner"
);
