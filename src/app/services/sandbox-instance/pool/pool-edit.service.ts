import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {Observable} from 'rxjs';
import {SandboxDefinition} from '../../../model/sandbox/definition/sandbox-definition';

export abstract class PoolEditService {
  abstract create(pool: SandboxPool): Observable<any>;

 abstract selectDefinition(currSelected: SandboxDefinition): Observable<SandboxDefinition>;
}

