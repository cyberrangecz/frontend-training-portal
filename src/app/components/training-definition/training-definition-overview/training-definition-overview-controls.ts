import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {defer, of} from 'rxjs';
import {KypoControlItem} from 'kypo-controls';

export class TrainingDefinitionOverviewControls {

  static readonly CREATE_ACTION_ID = 'create';
  static readonly UPLOAD_ACTION_ID = 'upload';

  static create(service: TrainingDefinitionService): KypoControlItem[] {
    return [
      new KypoControlItem(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
        of(false),
        defer(() => service.create())
      ),
      new KypoControlItem(
        this.UPLOAD_ACTION_ID,
        'Upload',
        'primary',
        of(false),
        defer(() => service.upload())
      )
    ];
  }
}
