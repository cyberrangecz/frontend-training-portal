import {SandboxInstance} from '../sandbox/pool/sandbox-instance/sandbox-instance';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {of} from 'rxjs';
import {RouteFactory} from '../routes/route-factory';
import {PaginatedResource} from './paginated-resource';

export class SandboxInstanceTableCreator {

  static readonly DELETE_ACTION = 'delete';
  static readonly TOPOLOGY_ACTION = 'topology';

  static create(resource: PaginatedResource<SandboxInstance[]>): Kypo2Table<SandboxInstance> {
    const actions = [
      new RowAction(this.DELETE_ACTION, 'delete', 'warn', 'Delete sandbox instance', of(false)),
      new RowAction(this.TOPOLOGY_ACTION, 'device_hub', 'primary', 'Display topology', of(false))
  ];
    const rows = resource.elements.map(instance => {
      const row = new Row(instance, actions);
      row.addLink('id', RouteFactory.toSandboxInstance(instance.poolId, instance.id));
      return row;
    });
    const table = new Kypo2Table<SandboxInstance>(
      rows,
      [
        new Column('id', 'id', false),
        new Column('stateLabel', 'state', false),
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }
}
