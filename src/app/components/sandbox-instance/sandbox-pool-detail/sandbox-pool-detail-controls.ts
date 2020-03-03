import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {defer, of} from 'rxjs';
import {KypoControlItem} from 'kypo-controls';

export class SandboxPoolDetailControls {
  static readonly ALLOCATE_ACTION_ID = 'allocate';

  static create(pool: SandboxPool, service: SandboxInstanceService): KypoControlItem[] {
    return  [
      new KypoControlItem(
        this.ALLOCATE_ACTION_ID,
        'Allocate',
        'primary',
        of(pool.isFull()),
        defer(() => service.allocate(pool.id))
      )
    ];
  }
}
