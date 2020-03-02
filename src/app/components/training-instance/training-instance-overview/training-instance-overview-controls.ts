import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {ControlButton} from '../../../model/controls/control-button';
import {defer, of} from 'rxjs';

export class TrainingInstanceOverviewControls {

  static CREATE_ACTION_ID = 'add';

  static create(service: TrainingInstanceOverviewService): ControlButton[] {
    return [
      new ControlButton(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
        of(false),
        defer(() => service.create())
      )
    ];
  }
}
