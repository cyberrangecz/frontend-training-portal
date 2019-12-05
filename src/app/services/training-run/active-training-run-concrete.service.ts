import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../environments/environment';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {ActiveTrainingRunPollingService} from './active-training-run-polling.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TrainingInstance} from '../../model/training/training-instance';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {AlertService} from '../shared/alert.service';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';

@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunPollingService {

  private activeTrainingRunsSubject: BehaviorSubject<PaginatedResource<TrainingRunTableRow[]>> = new BehaviorSubject(this.initSubject());
  activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  trainingInstance: TrainingInstance;

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private sandboxInstanceFacade: SandboxInstanceFacade,
              private activeTrainingInstanceService: ActiveTrainingInstanceService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
    this.trainingInstance = activeTrainingInstanceService.get();
    this.activeTrainingRuns$ = merge(this.activeTrainingRunPoll$, this.activeTrainingRunsSubject.asObservable())
      .pipe(
        tap(
          paginatedRuns => this.totalLengthSubject.next(paginatedRuns.pagination.totalElements)
        )
      );
  }

  getAll(id: number, pagination?: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.onManualGetAll(id, pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(id, pagination)
      .pipe(
        tap( runs => {
            this.activeTrainingRunsSubject.next(runs);
            this.totalLengthSubject.next(runs.pagination.totalElements);
          },
          err => this.onGetAllError(err)
        )
      );
  }

  deleteSandbox(trainingId: number, sandboxId: number): Observable<any> {
    return this.sandboxInstanceFacade.deleteByTrainingInstance(trainingId, sandboxId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Deleting of sandbox instance started'),
          err => this.errorHandler.display(err, 'Deleting sandbox instance')
        ),
        switchMap(_ => this.getAll(trainingId, this.lastPagination))
      )
  }



  private initSubject(): PaginatedResource<TrainingRunTableRow[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }

  protected repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(this.lastTrainingInstanceId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Obtaining training runs');
    this.hasErrorSubject$.next(true);
  }
}
