import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {switchMap, tap} from 'rxjs/operators';
import {KypoPaginatedResource} from 'kypo-common';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {SandboxInstanceService} from './sandbox-instance.service';
import {Router} from '@angular/router';
import {KypoRequestedPagination} from 'kypo-common';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {RouteFactory} from '../../../model/routes/route-factory';
import {environment} from '../../../../environments/environment';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can get sandbox instances and perform various operations to modify them.
 */
@Injectable()
export class SandboxInstanceConcreteService extends SandboxInstanceService {

  private lastPagination: KypoRequestedPagination;
  private lastPoolId: number;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private router: Router,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  /**
   * Gets all sandbox instances with passed pagination and updates related observables or handles an error
   * @param poolId id of a pool associated with sandbox instances
   * @param pagination requested pagination
   */
  getAll(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxInstance>> {
    this.hasErrorSubject$.next(false);
    this.lastPoolId = poolId;
    this.lastPagination = pagination;
    return this.sandboxInstanceFacade.getSandboxes(poolId, pagination)
      .pipe(
        tap(
          paginatedInstances => {
            this.resourceSubject$.next(paginatedInstances);
          },
          err => {
            this.errorHandler.emit(err, 'Fetching sandbox instances');
            this.hasErrorSubject$.next(true);
          }
        ),
      );
  }

  /**
   * Deletes a sandbox instance, informs about the result and updates list of requests or handles an error
   * @param sandboxInstance a sandbox instance to be deleted
   */
  delete(sandboxInstance: SandboxInstance): Observable<any> {
    return this.sandboxInstanceFacade.createCleanupRequest(sandboxInstance.allocationUnitId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Sandbox ${sandboxInstance.id} was deleted`),
          err => this.errorHandler.emit(err, `Deleting sandbox ${sandboxInstance.id}`)),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }

  /**
   * Starts an allocation of a sandbox instance, informs about the result and updates list of requests or handles an error
   * @param poolId id of a pool in which the allocation will take place
   */
  allocate(poolId: number): Observable<any> {
    return this.sandboxInstanceFacade.allocateSandboxes(poolId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Allocation of pool ${poolId} started`),
          err => this.errorHandler.emit(err, `Allocating pool ${poolId}`)),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }

  /**
   * Unlocks a sandbox instance making it available for modification.
   * Informs about the result and updates list of requests or handles an error
   * @param sandboxInstance a sandbox instance to be unlocked
   */
  unlock(sandboxInstance: SandboxInstance): Observable<any> {
    return this.sandboxInstanceFacade.unlockSandbox(sandboxInstance.id, sandboxInstance.lockId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Sandbox${sandboxInstance.id} was unlocked`),
        err => this.errorHandler.emit(err, `Unlocking sandbox ${sandboxInstance.id}`)
        ),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }

  /**
   * Lock a sandbox instance making it unavailable for modification and save for usage.
   * Informs about the result and updates list of requests or handles an error
   * @param sandboxInstance a sandbox instance to be locked
   */
  lock(sandboxInstance: SandboxInstance): Observable<any> {
    return this.sandboxInstanceFacade.lockSandbox(sandboxInstance.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Sandbox ${sandboxInstance.id} was locked` ),
          err => this.errorHandler.emit(err, `Locking sandbox ${sandboxInstance.id}`)
        ),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }

  showTopology(poolId: number, sandboxInstance: SandboxInstance): Observable<any> {
    return from(this.router.navigate([RouteFactory.toSandboxInstanceTopology(poolId, sandboxInstance.id)]));
  }

}

