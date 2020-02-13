import {TrainingInstanceOverviewService} from './training-instance-overview.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingInstance} from '../../model/training/training-instance';
import {environment} from '../../../environments/environment';
import {AlertService} from '../shared/alert.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingInstanceFilter} from '../../model/utils/training-instance-filter';
import {map, switchMap, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {Injectable} from '@angular/core';
import {TrainingInstanceApi} from '../api/training-instance-api.service';
import {SandboxInstanceApi} from '../api/sandbox-instance-api.service';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Pagination} from '../../model/table/other/pagination';

@Injectable()
export class TrainingInstanceOverviewConcreteService extends TrainingInstanceOverviewService {

  private lastPagination: RequestedPagination;
  private lastFilter: string;
  private trainingInstancesSubject$: BehaviorSubject<PaginatedResource<TrainingInstance>> = new BehaviorSubject(this.initSubject());
  trainingInstances$: Observable<PaginatedResource<TrainingInstance>> = this.trainingInstancesSubject$.asObservable();

  constructor(private trainingInstanceApi: TrainingInstanceApi,
              private sandboxInstanceApi: SandboxInstanceApi,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<TrainingInstance>> {
    this.lastPagination = pagination;
    this.lastFilter = filter;
    this.hasErrorSubject$.next(false);
    const filters = filter ? [new TrainingInstanceFilter(filter)] : [];
    return this.trainingInstanceApi.getAll(pagination, filters)
      .pipe(
        tap(
          resource => {
            this.trainingInstancesSubject$.next(resource);
            this.totalLengthSubject$.next(resource.pagination.totalElements);
            },
            err => {
            this.hasErrorSubject$.next(true);
            this.errorHandler.display(err, 'Fetching training instances');
          })
      );
  }

  archive(id: number): Observable<any> {
    return this.trainingInstanceApi.archive(id);
  }

  delete(id: number): Observable<any> {
    return this.trainingInstanceApi.delete(id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully deleted'),
          err => this.errorHandler.display(err, 'Deleting training instance')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilter))
      );
  }

  getPoolState(poolId: number): Observable<string> {
    return this.sandboxInstanceApi.getPool(poolId)
      .pipe(
        map(pool => `${pool.maxSize} (${pool.maxSize - pool.usedSize} free)`)
      );
  }

  private initSubject(): PaginatedResource<TrainingInstance> {
    return new PaginatedResource([],
      new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));

  }
}
