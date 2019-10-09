import {SandboxInstanceResourceService} from './sandbox-instance-resource.service';
import {Observable, Subject} from 'rxjs';
import {Kypo2Table} from 'kypo2-table';
import {SandboxInstanceResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {SandboxInstanceResourceTableCreator} from '../../model/table-adapters/sandbox-instance-resource-table-creator';
import {Injectable} from '@angular/core';

@Injectable()
export class SandboxInstanceResourceConcreteService extends SandboxInstanceResourceService {

  private resourceSubject: Subject<Kypo2Table<SandboxInstanceResource>> = new Subject();
  resources$: Observable<Kypo2Table<SandboxInstanceResource>> = this.resourceSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(poolId: number, sandboxInstanceId: number): Observable<SandboxInstanceResource[]> {
    return this.sandboxInstanceFacade.getResources(sandboxInstanceId)
      .pipe(
        tap(
          resources => this.resourceSubject.next(SandboxInstanceResourceTableCreator.create(resources, poolId, sandboxInstanceId)),
        err => this.errorHandler.display(err, 'Fetching sandbox resources')
        )
      );
  }

}
