import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {RouteFactory} from '../routes/route-factory';
import {PoolRequest} from '../sandbox/pool/request/pool-request';
import {PaginatedResource} from './paginated-resource';
import {of} from 'rxjs';

export class PoolRequestTableCreator {

  static readonly CANCEL_ACTION = 'cancel';
  static readonly RETRY_ACTION =  'retry';

  static create(resource: PaginatedResource<PoolRequest[]>, poolId: number): Kypo2Table<PoolRequest> {
    const table = new Kypo2Table<PoolRequest>(
      this.createRows(resource, poolId),
      [
        new Column('id', 'id', false),
        new Column('stagesCount', 'No. of stages', false)
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }

  private static createRows(resource: PaginatedResource<PoolRequest[]>, poolId: number): Row<PoolRequest>[] {
    return resource.elements.map(request => {
      const actions = [
        new RowAction(this.CANCEL_ACTION, 'cancel', 'warn', 'Cancel running request', of(!request.isRunning())),
        new RowAction(this.RETRY_ACTION, 'replay', 'primary', 'Try again', of(!request.isFailed()))
      ];
      const row = new Row(request, actions);
      row.addLink('id', RouteFactory.toPoolRequest(poolId, request.id));
      return row;
    });
  }
}
