import {TrainingInstanceOverviewService} from './training-instance-overview.service';
import {Observable, of} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from '../../model/training/training-instance';
import {AlertService} from '../shared/alert.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingInstanceFilter} from '../../model/utils/training-instance-filter';
import {map, switchMap, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {Injectable} from '@angular/core';
import {TrainingInstanceApi} from '../api/training-instance-api.service';
import {KypoRequestedPagination} from 'kypo-common';
import {RouteFactory} from '../../model/routes/route-factory';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PoolApi} from 'kypo-sandbox-api';

@Injectable()
export class TrainingInstanceOverviewConcreteService extends TrainingInstanceOverviewService {

  private lastPagination: KypoRequestedPagination;
  private lastFilter: string;

  constructor(private trainingInstanceApi: TrainingInstanceApi,
              private poolApi: PoolApi,
              private router: Router,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  getAll(pagination: KypoRequestedPagination, filter: string = null): Observable<KypoPaginatedResource<TrainingInstance>> {
    this.lastPagination = pagination;
    this.lastFilter = filter;
    this.hasErrorSubject$.next(false);
    const filters = filter ? [new TrainingInstanceFilter(filter)] : [];
    return this.trainingInstanceApi.getAll(pagination, filters)
      .pipe(
        tap(
          resource => {
            this.resourceSubject$.next(resource);
            },
            err => {
            this.hasErrorSubject$.next(true);
            this.errorHandler.emit(err, 'Fetching training instances');
          })
      );
  }

  create(): Observable<any> {
    return of(this.router.navigate([RouteFactory.toNewTrainingInstance()]));
  }

  edit(id: number): Observable<any> {
    return of(this.router.navigate([RouteFactory.toTrainingInstanceEdit(id)]));
  }

  download(id: number): Observable<any> {
    return this.trainingInstanceApi.archive(id);
  }

  delete(id: number): Observable<any> {
    return this.trainingInstanceApi.delete(id)
      .pipe(
        tap(_ => this.alertService.emit('success', 'Training instance was successfully deleted'),
          err => this.errorHandler.emit(err, 'Deleting training instance')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilter))
      );
  }

  getPoolState(poolId: number): Observable<string> {
    return this.poolApi.getPool(poolId)
      .pipe(
        map(pool => `${pool.maxSize} (${pool.maxSize - pool.usedSize} free)`)
      );
  }
}
