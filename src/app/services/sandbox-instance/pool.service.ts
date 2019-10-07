import {Observable} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {SandboxPool} from '../../model/sandbox/sandbox-pool';

export abstract class PoolService {
  pools$: Observable<Kypo2Table<SandboxPool>>;

  abstract get(pagination: RequestedPagination);
}
