import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {ControlButton} from '../../../model/controls/control-button';
import {defer, of} from 'rxjs';

export class SandboxDefinitionOverviewControls {

  static readonly CREATE_ACTION_ID = 'create';

  static create(service: SandboxDefinitionOverviewService) {
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
