import {Injectable} from '@angular/core';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {Observable, Subject} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingDefinitionInfo} from '../../../model/training/training-definition-info';
import {Filter} from '../../../model/utils/filter';
import {tap} from 'rxjs/operators';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

/**
 * Layer between component and API service
 * Subscribe to trainingDefinition$ to receive latest data updates.
 */
@Injectable()
export class TrainingDefinitionOrganizerSelectorService extends PaginatedResourceService {
  private tdsSubject: Subject<PaginatedResource<TrainingDefinitionInfo[]>> = new Subject();

  trainingDefinition$: Observable<PaginatedResource<TrainingDefinitionInfo[]>> = this.tdsSubject.asObservable();
  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();
  isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();
  totalLength$: Observable<number> = this.totalLengthSubject$.asObservable();

  constructor(private tdFacade: TrainingDefinitionApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets paginated training definitions and updates related observables or handles error
   * @param pagination requested pagination
   * @param stateFilter filter (state attribute) which should be applied to requested training definitions
   */
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
