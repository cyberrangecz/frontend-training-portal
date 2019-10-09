import {Observable} from 'rxjs';
import {SandboxInstanceResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {Kypo2Table} from 'kypo2-table';

export abstract class SandboxInstanceResourceService {
  abstract resources$: Observable<Kypo2Table<SandboxInstanceResource>>;
  abstract getAll(poolId: number, sandboxInstanceId: number): Observable<SandboxInstanceResource[]>;
}
