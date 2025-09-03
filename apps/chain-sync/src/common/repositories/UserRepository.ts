import { User } from "@common/entities/User";
import { Connection, EntityManager } from "typeorm";
import { AbstractRepository } from "@common/repositories/shared/AbstractRepository";
import { IdIndexable } from "@common/interfaces/IdIndexable";

class UserRepositoryImpl extends AbstractRepository<User> {
  public async findById(
    id: number,
    executor: EntityManager | Connection = this.connection
  ): Promise<(User & IdIndexable) | undefined> {
    const user = await this.findWithRelations(id, [], executor);

    if (!user) {
      return;
    }

    return user;
  }

  public async findByAddress(
    address: string,
    executor: EntityManager | Connection = this.connection
  ): Promise<(User & IdIndexable) | undefined> {
    const user = await this.findOneWhere(
      "address= :address",
      { address: address.toLowerCase() },
      [],
      executor
    );

    if (!user) {
      return;
    }

    return user;
  }
}

export const UserRepository = new UserRepositoryImpl(User, "user");
