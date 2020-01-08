import {SandboxInstanceResourceService} from './sandbox-instance-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Cacheable} from 'ngx-cacheable';

/**
 * Clears cached data on emission
 */
const cacheBuster$: Subject<void> = new Subject();

/**
 * Basic implementation of a layer between a component and an API service.
 * Can get sandbox instance resources
 */
@Injectable()
export class SandboxInstanceResourceConcreteService extends SandboxInstanceResourceService {

  private resourceSubject: BehaviorSubject<SandboxInstanceResource[]> = new BehaviorSubject([]);
  /**
   * List of sandbox instance resources
   */
  resources$: Observable<SandboxInstanceResource[]> = this.resourceSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets all sandbox instance resources and updates related observables or handles an error.
   * Is cached until cacheBuster emission
   * @param sandboxInstanceId id of a sandbox instance associated with requested resources.
   */
  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(sandboxInstanceId: number): Observable<SandboxInstanceResource[]> {
    return this.sandboxInstanceFacade.getResources(sandboxInstanceId)
      .pipe(
        tap(
          resources => this.resourceSubject.next(resources),
        err => {
            this.errorHandler.display(err, 'Fetching sandbox resources');
            this.hasErrorSubject.next(true);
          }
        )
      );
  }
}
