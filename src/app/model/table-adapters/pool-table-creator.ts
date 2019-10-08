import {PaginatedResource} from './paginated-resource';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {SandboxPool} from '../sandbox/pool/sandbox-pool';
import {RouteFactory} from '../routes/route-factory';
import {of} from 'rxjs';

export class PoolTableCreator {
  static create(resource: PaginatedResource<SandboxPool[]>): Kypo2Table<SandboxPool> {
    const actions = [
      new RowAction('delete', 'delete', 'warn', 'Delete Pool', of(false)),
      new RowAction('allocate', ' subscriptions', 'primary', 'Allocate pool', of(false))
    ];
    const rows = resource.elements.map(pool => {
      const deleteAction = actions[0];
      const allocateAction = actions[1];
      deleteAction.disabled$ = of(pool.usedSize !== 0);
      allocateAction.disabled$ = of(pool.usedSize === pool.maxSize);
      const row = new Row(pool, [allocateAction, deleteAction]);
      row.addLink('id', RouteFactory.toPool(pool.id));
      return row;
    });
    const table = new Kypo2Table<SandboxPool>(
      rows,
      [
        new Column('id', 'id', false),
        new Column('definitionId', 'definition id', false),
        new Column('usedAndMaxSize', 'size', false)
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }
}
