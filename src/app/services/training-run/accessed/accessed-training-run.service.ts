import {Observable} from 'rxjs';
import {KypoRequestedPagination} from 'kypo-common';
import {AccessedTrainingRun} from '../../../model/table/rows/accessed-training-run';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPaginatedResourceService} from 'kypo-common';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
export abstract class AccessedTrainingRunService extends KypoPaginatedResourceService<AccessedTrainingRun> {

  /**
   * Requests paginated data
   * @param pagination requested pagination info
   */
  abstract getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>>;

  /**
   * Resume in already started training run
   * @param trainingRunId id of training run to resume
   */
  abstract resume(trainingRunId: number): Observable<any>;

  abstract results(trainingRunId: number): Observable<any>;

  abstract access(token: string): Observable<any>;
}
