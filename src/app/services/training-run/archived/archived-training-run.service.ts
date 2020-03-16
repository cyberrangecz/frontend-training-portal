import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoPaginatedResourceService} from 'kypo-common';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingRun} from '../../../model/training/training-run';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 * Subscribe to archivedTrainingRuns$ to receive latest data updates.
 */
@Injectable()
export abstract class ArchivedTrainingRunService extends KypoPaginatedResourceService<TrainingRun> {

  /**
   * @contract must be updated every time new data are received
   */
  abstract archivedTrainingRuns$: Observable<KypoPaginatedResource<TrainingRun>>;

  /**
   * Starts polling in regular intervals
   * @param trainingInstance training instance associated with archived training runs
   */
  abstract startPolling(trainingInstance: TrainingInstance);

  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(trainingInstanceId: number, pagination?: KypoRequestedPagination): Observable<KypoPaginatedResource<TrainingRun>>;

  /**
   * Deletes archived training run
   * @param id id of archived training run
   */
  abstract delete(id: number): Observable<any>;

  /**
   * Deletes archived training runs
   * @param idsToDelete ids of archived training runs
   */
  abstract deleteMultiple(idsToDelete: number[]): Observable<any>;

}
