import {TrainingInstanceEditService} from '../../../services/training-instance/edit/training-instance-edit.service';
import {ControlButton} from '../../../model/controls/control-button';
import {defer, Observable} from 'rxjs';

export class TrainingInstanceEditControls {
  static readonly SAVE_ACTION_ID = 'save';
  static readonly SAVE_AND_STAY_ACTION_ID = 'save_and_stay';

  static create(service: TrainingInstanceEditService, isEditMode: boolean, saveDisabled$: Observable<boolean>): ControlButton[] {
    return isEditMode
      ? this.createModeControls(service, saveDisabled$)
      : this.editModeControls(service, saveDisabled$);
  }

  private static createModeControls(service: TrainingInstanceEditService, saveDisabled$: Observable<boolean>): ControlButton[] {
    return [
      new ControlButton(
        this.SAVE_ACTION_ID,
        'Save',
        'primary',
        saveDisabled$,
        defer(() => service.save())
      ),
    ];
  }

  private static editModeControls(service: TrainingInstanceEditService, saveDisabled$: Observable<boolean>): ControlButton[] {
    return [
      new ControlButton(
        this.SAVE_ACTION_ID,
        'Create',
        'primary',
        saveDisabled$,
        defer(() => service.save())
      ),
      new ControlButton(
        this.SAVE_AND_STAY_ACTION_ID,
        'Create and continue editing',
        'primary',
        saveDisabled$,
        defer(() => service.createAndStay())
      ),
    ];
  }
}
