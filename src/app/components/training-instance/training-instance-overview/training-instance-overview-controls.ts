import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {defer, of} from 'rxjs';
import {KypoControlItem} from 'kypo-controls';

export class TrainingInstanceOverviewControls {

  static CREATE_ACTION_ID = 'add';

  static create(service: TrainingInstanceOverviewService): KypoControlItem[] {
    return [
      new KypoControlItem(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
        of(false),
        defer(() => service.create())
      )
    ];
  }
}
