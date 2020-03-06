import {PaginatedResource} from '../../other/paginated-resource';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {RouteFactory} from '../../../routes/route-factory';
import {PoolCreationRequest} from '../../../sandbox/pool/request/pool-creation-request';

export class CreationRequestTable extends Kypo2Table<PoolCreationRequest> {

  constructor(resource: PaginatedResource<PoolCreationRequest>, poolId: number) {
    const columns = [
      new Column('id', 'id', false),
      new Column('createdAtFormatted', 'created', false),
    ];
    const rows = resource.elements.map(element => CreationRequestTable.createRow(element, poolId));
    super(rows, columns);
    this.pagination = resource.pagination;
  }

  private static  createRow(request: PoolCreationRequest, poolId: number): Row<PoolCreationRequest> {
    const row = new Row(request);
    row.addLink('id', RouteFactory.toCreationRequest(poolId, request.id));
    return row;
  }
}
