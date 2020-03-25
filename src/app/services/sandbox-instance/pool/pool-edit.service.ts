import {Pool} from '../../../model/sandbox/pool/pool';
import {Observable} from 'rxjs';
import {SandboxDefinition} from '../../../model/sandbox/definition/sandbox-definition';

export abstract class PoolEditService {
  abstract create(pool: Pool): Observable<any>;

 abstract selectDefinition(currSelected: SandboxDefinition): Observable<SandboxDefinition>;
}

