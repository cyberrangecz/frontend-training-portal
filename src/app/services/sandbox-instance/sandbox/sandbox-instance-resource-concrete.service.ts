import {SandboxInstanceResourceService} from './sandbox-instance-resource.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Cacheable} from 'ngx-cacheable';

const cacheBuster$: Subject<void> = new Subject();

@Injectable()
export class SandboxInstanceResourceConcreteService extends SandboxInstanceResourceService {

  private resourceSubject: BehaviorSubject<SandboxInstanceResource[]> = new BehaviorSubject([]);
  resources$: Observable<SandboxInstanceResource[]> = this.resourceSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

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
