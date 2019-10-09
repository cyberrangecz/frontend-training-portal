import {SandboxInstance} from '../sandbox/pool/sandbox-instance/sandbox-instance';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {of} from 'rxjs';
import {RouteFactory} from '../routes/route-factory';
import {PaginatedResource} from './paginated-resource';

export class SandboxInstanceTableCreator {
  static create(resource: PaginatedResource<SandboxInstance[]>): Kypo2Table<SandboxInstance> {
    const actions = [
      new RowAction('delete', 'delete', 'warn', 'Delete sandbox instance', of(false))
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
