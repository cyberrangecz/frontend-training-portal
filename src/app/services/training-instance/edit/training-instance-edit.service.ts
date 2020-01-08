import {Observable} from 'rxjs';
import {ResourceSavedEvent} from '../../../model/events/resource-saved-event';
import {TrainingInstanceChangeEvent} from '../../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../../model/training/training-instance';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to trainingInstance$ to receive latest data updates.
 */
export abstract class TrainingInstanceEditService {

  /** Currently edited training instance
   * @contract must be updated when set() method is called
   */
  abstract trainingInstance$: Observable<TrainingInstance>;

  /** Current mode (edit - true or create - false)
   * @contract must be updated when set() method is called
   */
  abstract editMode$: Observable<boolean>;

  /** True if it is possible to save edited training instance in its current state
   * @contract must be updated when change() and save() methods are called
   */
  abstract saveDisabled$: Observable<boolean>;

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  abstract set(trainingInstance: TrainingInstance);

  /**
   * Saves changes in currently edited training instance
   */
  abstract save(): Observable<ResourceSavedEvent>;

  /**
   * Handles changes of edited training instance
   * @param changeEvent training instance object and its validity
   */
  abstract change(changeEvent: TrainingInstanceChangeEvent);
}
