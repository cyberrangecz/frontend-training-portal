import {ControlButton} from '../../../model/controls/control-button';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {defer, of} from 'rxjs';

export class SandboxPoolDetailControls {
  static readonly ALLOCATE_ACTION_ID = 'allocate';

  static create(pool: SandboxPool, service: SandboxInstanceService): ControlButton[] {
    return  [
      new ControlButton(
        this.ALLOCATE_ACTION_ID,
        'Allocate',
        'primary',
        of(pool.isFull()),
        defer(() => service.allocate(pool.id))
      )
    ];
  }
}
