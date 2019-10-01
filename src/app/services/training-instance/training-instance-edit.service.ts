import {Observable} from 'rxjs';
import {TrainingInstance} from '../../model/training/training-instance';
import {ResourceSavedEvent} from '../../model/events/resource-saved-event';
import {TrainingInstanceChangeEvent} from '../../model/events/training-instance-change-event';

export abstract class TrainingInstanceEditService {

  abstract trainingInstance$: Observable<TrainingInstance>;
  abstract editMode$: Observable<boolean>;
  abstract saveDisabled$: Observable<boolean>;

  abstract set(trainingInstance: TrainingInstance);

  abstract save(): Observable<ResourceSavedEvent>;

  abstract change(changeEvent: TrainingInstanceChangeEvent);
}
