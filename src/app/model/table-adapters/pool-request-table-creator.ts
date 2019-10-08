import {PaginatedResource} from './paginated-resource';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {PoolRequest} from '../sandbox/pool/request/pool-request';
import {RouteFactory} from '../routes/route-factory';

export class PoolRequestTableCreator {
  static create(resource: PaginatedResource<PoolRequest[]>, poolId: number): Kypo2Table<PoolRequest> {
    const actions = [
    ];
    const rows = resource.elements.map(request => {
      const row = new Row(request, actions);
      row.addLink('id', RouteFactory.toPoolRequest(poolId, request.id));
      return row;
    });
    const table = new Kypo2Table<PoolRequest>(
      rows,
      [
        new Column('id', 'id', false),
        new Column('type', 'Type', false),
        new Column('stagesCount', 'No. of stages', false)
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }
}
