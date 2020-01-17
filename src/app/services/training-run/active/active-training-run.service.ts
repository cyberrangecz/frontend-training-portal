import {Injectable} from '@angular/core';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../../model/table/row/training-run-table-row';
import {TrainingInstance} from '../../../model/training/training-instance';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 * Subscribe to activeTrainingRuns$ to receive latest data updates.
 */
@Injectable()
export abstract class ActiveTrainingRunService extends PaginatedResourceService {

  /***
   * @contract must be updated every time new data are received
   */
  abstract activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow>>;

  /**
   * Starts polling in regular intervals
   * @param trainingInstance training instance associated with active training runs
   */
  abstract startPolling(trainingInstance: TrainingInstance);

  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow>>;

  /**
   * Deletes sandbox associated with active training run
   * @param trainingInstanceId id of training instance associated with training run
   * @param sandboxId id of sandbox to delete
   */
  abstract deleteSandbox(trainingInstanceId: number, sandboxId: number): Observable<any>;
}
