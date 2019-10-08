import {PoolRequest} from './pool-request';

export class PoolDeletionRequest extends PoolRequest {

  constructor() {
    super();
    this.type = 'Deletion';
  }
}
