import { TransferRequest } from '@common/entities/TransferRequest';
import { Action } from 'routing-controllers';

// tslint:disable-next-line: no-namespace
export namespace TransferRequestSerializer {
  export const serializeOneTransferRequest = (
    request: TransferRequest,
  ) => ({
    id: request.id,
    type: request.type,
    state: request.state,
    comments: request.comments,
    createdAt: request.createdAt,
  });

  export const serializeTransferRequests = (
    requests: TransferRequest[],
  ) =>
    requests.map((request) => serializeOneTransferRequest(request));

  export const serializeTransferRequest = (
    _action: Action,
    request: TransferRequest,
  ) => ({
    data: serializeOneTransferRequest(request),
  });
}
