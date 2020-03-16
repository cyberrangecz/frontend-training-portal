import {Injectable} from '@angular/core';
import {KypoPaginatedResource} from 'kypo-common';
import {Observable} from 'rxjs';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingDefinitionInfo} from '../../../model/training/training-definition-info';
import {KypoFilter} from 'kypo-common';
import {tap} from 'rxjs/operators';
import {KypoPaginatedResourceService} from 'kypo-common';
import {environment} from '../../../../environments/environment';

/**
 * Layer between component and API service
 */
@Injectable()
export class TrainingDefinitionOrganizerSelectorService extends KypoPaginatedResourceService<TrainingDefinitionInfo> {

  constructor(private api: TrainingDefinitionApi,
              private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  /**
   * Gets paginated training definitions and updates related observables or handles error
   * @param pagination requested pagination
   * @param stateFilter filter (state attribute) which should be applied to requested training definitions
   */
  get(pagination: KypoRequestedPagination, stateFilter: string): Observable<KypoPaginatedResource<TrainingDefinitionInfo>> {
    this.hasErrorSubject$.next(false);
    this.isLoadingSubject$.next(true);
    return this.api.getAllForOrganizer(pagination, [new KypoFilter('state', stateFilter)])
      .pipe(
        tap(
          definitions =>  {
            this.resourceSubject$.next(definitions);
            this.isLoadingSubject$.next(false);
          },
          err => {
            this.hasErrorSubject$.next(true);
            this.errorHandler.emit(err, `Fetching ${stateFilter} Training Definitions`);
            this.isLoadingSubject$.next(false);
          }
        )
      );
  }

}
