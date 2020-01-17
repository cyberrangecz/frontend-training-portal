import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {of} from 'rxjs';
import {RouteFactory} from '../../routes/route-factory';
import {SandboxPool} from '../../sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../other/paginated-resource';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class PoolTableCreator {

  static readonly DELETE_ACTION = 'Delete';
  static readonly ALLOCATE_ALL_ACTION = 'Allocate all';
  static readonly ALLOCATE_ONE_ACTION = 'Allocate one';
  static readonly CLEAR_ACTION = 'Delete sandboxes';

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   */
  static create(resource: PaginatedResource<SandboxPool> = null): Kypo2Table<SandboxPool> {
    const table = new Kypo2Table<SandboxPool>(
      this.createRows(resource),
      [
        new Column('id', 'id', false),
        new Column('definitionId', 'definition id', false),
        new Column('usedAndMaxSize', 'size', false)
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }

  private static createRows(resource: PaginatedResource<SandboxPool>): Row<SandboxPool>[] {
    return resource.elements.map(pool => {
      const actions = [
        new RowAction(this.DELETE_ACTION, 'delete', 'warn', 'Delete Pool', of(pool.usedSize !== 0)),
        new RowAction(this.ALLOCATE_ALL_ACTION, ' subscriptions', 'primary', 'Allocate pool', of(pool.isFull())),
        new RowAction(this.ALLOCATE_ONE_ACTION, 'exposure_plus_1', 'primary', 'Allocate one sandbox', of(pool.isFull())),
       // TODO: new RowAction(this.CLEAR_ACTION, 'clear_all', 'warn', 'Delete all sandboxes in pool', of(pool.isEmpty()))
      ];
      const row = new Row(pool, actions);
      row.addLink('id', RouteFactory.toPool(pool.id));
      return row;
    });
  }
}
