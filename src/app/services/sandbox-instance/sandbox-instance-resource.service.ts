import {BehaviorSubject, Observable} from 'rxjs';
import {SandboxInstanceResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';

export abstract class SandboxInstanceResourceService {
  protected hasErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasError$: Observable<boolean> = this.hasErrorSubject.asObservable();
  abstract resources$: Observable<SandboxInstanceResource[]>;
  abstract getAll(sandboxInstanceId: number): Observable<SandboxInstanceResource[]>;
}
