import {SandboxDefinitionCreateInfo} from '../../../model/sandbox/definition/sandbox-definition-create-info';
import {Observable} from 'rxjs';

export abstract class SandboxDefinitionDetailService {
  abstract create(sandboxDefinitionInfo: SandboxDefinitionCreateInfo): Observable<any>;
}
