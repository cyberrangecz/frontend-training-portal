import {Injectable} from '@angular/core';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {TrainingDefinitionFacade} from '../../facades/training-definition-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingDefinitionInfo} from '../../../model/training/training-definition-info';
import {Filter} from '../../../model/utils/filter';
import {tap} from 'rxjs/operators';

@Injectable()
export class TrainingDefinitionOrganizerSelectorService {
  private tdsSubject: Subject<PaginatedResource<TrainingDefinitionInfo[]>> = new Subject();
  private hasErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private totalLengthSubject$: Subject<number> = new Subject();

  trainingDefinition$: Observable<PaginatedResource<TrainingDefinitionInfo[]>> = this.tdsSubject.asObservable();
  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();
  isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();
  totalLength$: Observable<number> = this.totalLengthSubject$.asObservable();

  constructor(private tdFacade: TrainingDefinitionFacade,
              private errorHandler: ErrorHandlerService) {
  }

  get(pagination: RequestedPagination, stateFilter: string): Observable<PaginatedResource<TrainingDefinitionInfo[]>> {
    this.hasErrorSubject$.next(false);
    this.isLoadingSubject$.next(true);
    return this.tdFacade.getAllForOrganizer(pagination, [new Filter('state', stateFilter)])
      .pipe(
        tap(
          definitions =>  {
            this.tdsSubject.next(definitions);
            this.totalLengthSubject$.next(definitions.pagination.totalElements);
            this.isLoadingSubject$.next(false);
          },
          err => {
            this.hasErrorSubject$.next(true);
            this.errorHandler.display(err, `Fetching ${stateFilter} Training Definitions`);
            this.isLoadingSubject$.next(false);
          }
        )
      );
  }

}
