import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {of} from 'rxjs';
import {PaginatedResource} from '../other/paginated-resource';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxInstanceTableCreator {

  static readonly DELETE_ACTION_ID = 'delete';
  static readonly TOPOLOGY_ACTION_ID = 'topology';
  static readonly UNLOCK_ACTION_ID = 'unlock';
  static readonly LOCK_ACTION_ID = 'lock';

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   */
  static create(resource: PaginatedResource<SandboxInstance>): Kypo2Table<SandboxInstance> {
    const rows = resource.elements.map(instance => {
      const actions = [
        new RowAction(this.DELETE_ACTION_ID, 'Delete', 'delete', 'warn', 'Delete sandbox instance', of(false)),
        new RowAction(this.TOPOLOGY_ACTION_ID, 'Topology', 'device_hub', 'primary', 'Display topology', of(!instance.isCreated())),
        instance.locked
          ? new RowAction(this.UNLOCK_ACTION_ID, 'Unlock', 'lock_open', 'primary', 'Unlock sandbox instance', of(!instance.isCreated()))
          : new RowAction(this.LOCK_ACTION_ID, 'Lock', 'lock', 'primary', 'Lock sandbox instance', of(!instance.isCreated()))
      ];
      const row = new Row(instance, actions);
      // TODO: ADD row.addLink('id', RouteFactory.toSandboxInstance(instance.poolId, instance.id));
      return row;
    });
    const table = new Kypo2Table<SandboxInstance>(
      rows,
      [
        new Column('id', 'id', false),
        new Column('lockState', 'lock', false),
        new Column('stateLabel', 'state', false),
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }
}
