import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {DeleteAction} from '../actions/delete-action';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxInstanceTable extends Kypo2Table<SandboxInstance> {


  constructor(resource: KypoPaginatedResource<SandboxInstance>, poolId: number, service: SandboxInstanceService) {
    const columns = [
      new Column('id', 'id', false),
      new Column('lockState', 'lock', false),
      new Column('stateLabel', 'state', false),
    ];
    const rows = resource.elements.map(element => SandboxInstanceTable.createRow(element, poolId, service));
    super(rows, columns);
    this.pagination = resource.pagination;
  }

  private static createRow(instance: SandboxInstance, poolId: number, service: SandboxInstanceService): Row<SandboxInstance> {
    const row = new Row(instance, this.createActions(instance, poolId, service));
    // TODO: ADD when supported by API
    //  row.addLink('id', RouteFactory.toSandboxInstance(poolId, instance.id));
    return row;
  }

  private static createActions(instance: SandboxInstance, poolId: number, service: SandboxInstanceService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox instance',
        of(false),
        defer(() => service.delete(instance))
      ),
      new RowAction('topology',
        'Topology',
        'device_hub',
        'primary',
        'Display topology',
        of(!instance.isCreated()),
        defer(() => service.showTopology(poolId, instance))
      ),
      instance.locked
        ? new RowAction(
          'unlock',
        'Unlock',
        'lock_open',
        'primary',
        'Unlock sandbox instance',
        of(!instance.isCreated()),
        defer(() => service.unlock(instance)))
        : new RowAction(
          'lock',
        'Lock',
        'lock',
        'primary',
        'Lock sandbox instance',
        of(!instance.isCreated()),
        defer(() => service.lock(instance))
        )
    ];
  }
}
