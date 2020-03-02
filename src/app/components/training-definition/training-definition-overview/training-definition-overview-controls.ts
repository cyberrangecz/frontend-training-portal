import {ControlButton} from '../../../model/controls/control-button';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {defer, of} from 'rxjs';

export class TrainingDefinitionOverviewControls {

  static readonly CREATE_ACTION_ID = 'create';
  static readonly UPLOAD_ACTION_ID = 'upload';

  static create(service: TrainingDefinitionService): ControlButton[] {
    return [
      new ControlButton(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
        of(false),
        defer(() => service.create())
      ),
      new ControlButton(
        this.UPLOAD_ACTION_ID,
        'Upload',
        'primary',
        of(false),
        defer(() => service.upload())
      )
    ];
  }
}
