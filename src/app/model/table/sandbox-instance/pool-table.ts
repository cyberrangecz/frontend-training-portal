import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {RouteFactory} from '../../routes/route-factory';
import {SandboxPool} from '../../sandbox/pool/sandbox-pool';
import {KypoPaginatedResource} from 'kypo-common';
import {PoolService} from '../../../services/sandbox-instance/pool/pool.service';
import {DeleteAction} from '../actions/delete-action';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class PoolTable extends Kypo2Table<SandboxPool> {

  constructor(resource: KypoPaginatedResource<SandboxPool>, service: PoolService) {
    const rows = resource.elements.map(element => PoolTable.createRow(element, service));
    const columns = [
      new Column('id', 'id', false),
      new Column('definitionId', 'definition id', false),
      new Column('usedAndMaxSize', 'size', false)
    ];
    super(rows, columns);
    this.pagination = resource.pagination;
  }

  private static createRow(pool: SandboxPool, service: PoolService): Row<SandboxPool> {
    const row = new Row(pool, this.createActions(pool, service));
    row.addLink('id', RouteFactory.toPool(pool.id));
    return row;
  }

  private static createActions(pool: SandboxPool, service: PoolService): RowAction[] {
    return [
      new DeleteAction(
        'Delete Pool',
        of(pool.usedSize !== 0),
        defer(() => service.delete(pool))
      ),
      new RowAction(
        'allocate_all',
        'Allocate All',
        'subscriptions',
        'primary',
        'Allocate sandboxes',
        of(pool.isFull()),
        defer(() => service.allocate(pool))
      ),
      new RowAction(
        'allocate_one',
        'Allocate One',
        'exposure_plus_1',
        'primary',
        'Allocate one sandbox',
        of(pool.isFull()),
        defer(() => service.allocate(pool, 1))
        ),
    ];
  }
}
