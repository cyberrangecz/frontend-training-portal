import { Injectable } from '@angular/core';
import {TrainingRunOverviewService} from '../shared/training-run-overview.service';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {TrainingRunFacade} from '../facades/training-run-facade.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../model/table/row/accessed-training-run';
import {tap} from 'rxjs/operators';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class TrainingRunOverviewConcreteService extends TrainingRunOverviewService {

  private trainingRunsSubject: BehaviorSubject<PaginatedResource<AccessedTrainingRun[]>> = new BehaviorSubject(this.initSubject());
  trainingRuns$: Observable<PaginatedResource<AccessedTrainingRun[]>> = this.trainingRunsSubject.asObservable();

  constructor(private trainingRunFacade: TrainingRunFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  load(pagination?: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun[]>> {
    this.hasErrorSubject$.next(false);
    return this.trainingRunFacade.getAccessed(pagination).pipe(
      tap(trainingRuns => {
        this.trainingRunsSubject.next(trainingRuns);
        this.totalLengthSubject.next(trainingRuns.pagination.totalElements);
      },
        err => {
          this.errorHandler.display(err, 'Fetching training runs');
          this.hasErrorSubject$.next(true);
        })
    );
  }

  resume(id: number): Observable<any> {
    return this.trainingRunFacade.resume(id).pipe(
     tap({
       error: err => this.errorHandler.display(err, 'Resuming training run')
     })
   );
  }

  private initSubject(): PaginatedResource<AccessedTrainingRun[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
