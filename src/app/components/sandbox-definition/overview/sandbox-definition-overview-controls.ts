import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {defer, of} from 'rxjs';
import {KypoControlItem} from 'kypo-controls';

export class SandboxDefinitionOverviewControls {

  static readonly CREATE_ACTION_ID = 'create';

  static create(service: SandboxDefinitionOverviewService) {
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
