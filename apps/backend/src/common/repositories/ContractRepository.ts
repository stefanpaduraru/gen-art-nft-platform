import { Connection, EntityManager } from "typeorm";
import { AbstractRepository } from "@common/repositories/shared/AbstractRepository";
import { IdIndexable } from "@common/interfaces/IdIndexable";
import { Contract } from "@common/entities/Contract";

class ContractRepositoryImpl extends AbstractRepository<Contract> {
  public async findById(
    id: number,
    executor: EntityManager | Connection = this.connection
  ): Promise<(Contract & IdIndexable) | undefined> {
    const contract = await this.findWithRelations(id, [], executor);

    if (!contract) {
      return;
    }

    return contract;
  }

  public async findByAddress(
    address: string,
    executor: EntityManager | Connection = this.connection
  ): Promise<(Contract & IdIndexable) | undefined> {
    const contract = await this.findOneWhere(
      "address= :address",
      { address },
      [],
      executor
    );

    if (!contract) {
      return;
    }

    return contract;
  }
}

export const ContractRepository = new ContractRepositoryImpl(
  Contract,
  "contract"
);
