import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {switchMap, tap} from 'rxjs/operators';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {SandboxInstanceService} from './sandbox-instance.service';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';

const cacheBuster$: Subject<void> = new Subject();

@Injectable()
export class SandboxInstanceConcreteService extends SandboxInstanceService {

  private lastPagination: RequestedPagination;
  private instancesSubject: BehaviorSubject<PaginatedResource<SandboxInstance[]>> = new BehaviorSubject(this.initSubject());
  instances$: Observable<PaginatedResource<SandboxInstance[]>> = this.instancesSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>> {
    this.hasErrorSubject$.next(false);
    this.lastPagination = pagination;
    return this.sandboxInstanceFacade.getSandboxes(poolId, pagination)
      .pipe(
        tap(
          paginatedInstances => {
            this.instancesSubject.next(paginatedInstances);
            this.totalLengthSubject.next(paginatedInstances.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching sandbox instances');
            this.hasErrorSubject$.next(true);
          }
        ),
      );
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  delete(sandboxInstance: SandboxInstance): Observable<any> {
    return this.sandboxInstanceFacade.delete(sandboxInstance.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox instance was successfully deleted'),
          err => this.errorHandler.display(err, 'Deleting sandbox instance')),
        switchMap(_ => this.getAll(sandboxInstance.poolId, this.lastPagination))
      );
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  allocate(poolId: number): Observable<any> {
    return this.sandboxInstanceFacade.allocate(poolId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool allocation has started'),
          err => this.errorHandler.display(err, 'Allocating pool')),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }


  private initSubject(): PaginatedResource<SandboxInstance[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}

