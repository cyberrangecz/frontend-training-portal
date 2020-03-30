import {AllocationRequest} from 'kypo-sandbox-model';
import {Observable} from 'rxjs';
import {PoolRequestsPollingService} from '../pool-requests-polling.service';

export abstract class PoolAllocationRequestsPollingService extends PoolRequestsPollingService {
  abstract cancel(request: AllocationRequest): Observable<any>;

  abstract delete(request: AllocationRequest): Observable<any>
}
