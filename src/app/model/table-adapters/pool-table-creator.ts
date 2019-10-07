import {PaginatedResource} from './paginated-resource';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {SandboxPool} from '../sandbox/sandbox-pool';
import {RouteFactory} from '../routes/route-factory';

export class PoolTableCreator {
  static create(resource: PaginatedResource<SandboxPool[]>): Kypo2Table<SandboxPool> {
    const rows = resource.elements.map(pool => {
      const row = new Row(pool, []);
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
