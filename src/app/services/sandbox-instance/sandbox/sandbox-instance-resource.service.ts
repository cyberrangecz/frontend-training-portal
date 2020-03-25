import {BehaviorSubject, Observable} from 'rxjs';
import {SandboxResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-resource';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to resources$ to receive latest data updates.
 */
export abstract class SandboxInstanceResourceService {

  /**
   * True if server returned error response on the latest request, false otherwise.
   * Change internally in extending service. Client should subscribe to the observable
   */
  protected hasErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * True if server returned error response on the latest request, false otherwise
   * @contract must be updated every time new data are received
   */
  hasError$: Observable<boolean> = this.hasErrorSubject.asObservable();

  /**
   * @contract must be updated every time new data are received
   */
  abstract resources$: Observable<SandboxResource[]>;

  /**
   * @param sandboxInstanceId id of a sandbox instance associated with requested resources
   */
  abstract getAll(sandboxInstanceId: number): Observable<SandboxResource[]>;
}
