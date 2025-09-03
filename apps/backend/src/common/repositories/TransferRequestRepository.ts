import { Connection, EntityManager } from 'typeorm';
import { AbstractRepository } from '@common/repositories/shared/AbstractRepository';
import { IdIndexable } from '@common/interfaces/IdIndexable';
import { TransferRequest } from '@common/entities/TransferRequest';

class TransferRequestRepositoryImpl extends AbstractRepository<TransferRequest> {
  public async findByProjectId(
    id: number,
    executor: EntityManager | Connection = this.connection,
  ): Promise<(TransferRequest & IdIndexable)[] | undefined> {
    const requests = await this.findManyWhere(
      'projectId = :id',
      { id },
      [],
      executor,
    );

    if (!requests) {
      return;
    }

    return requests;
  }
}

export const TransferRequestRepository =
  new TransferRequestRepositoryImpl(
    TransferRequest,
    'transferRequest',
  );
