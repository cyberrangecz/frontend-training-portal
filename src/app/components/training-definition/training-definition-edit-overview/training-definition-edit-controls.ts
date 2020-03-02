import {defer, Observable} from 'rxjs';
import {ControlButton} from '../../../model/controls/control-button';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';

export class TrainingDefinitionEditControls {

  static readonly SAVE_ACTION_ID = 'save';
  static readonly SAVE_AND_STAY_ACTION_ID = 'save_and_stay';

  static create(service: TrainingDefinitionEditService, isEditMode: boolean, saveDisabled$: Observable<boolean>): ControlButton[] {
    return isEditMode
      ? this.createModeControls(service, saveDisabled$)
      : this.editModeControls(service, saveDisabled$);
  }

  private static createModeControls(service: TrainingDefinitionEditService, saveDisabled$: Observable<boolean>): ControlButton[] {
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

  private static editModeControls(service: TrainingDefinitionEditService, saveDisabled$: Observable<boolean>): ControlButton[] {
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
