import {KypoPaginatedResource} from 'kypo-common';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {RouteFactory} from '../../../routes/route-factory';
import {PoolCleanupRequest} from '../../../sandbox/pool/request/pool-cleanup-request';

export class CleanupRequestTable extends Kypo2Table<PoolCleanupRequest> {
  constructor(resource: KypoPaginatedResource<PoolCleanupRequest>, poolId: number) {
    const columns = [
      new Column('id', 'id', false),
      new Column('createdAtFormatted', 'created', false),
    ];
    const rows = resource.elements.map(element => CleanupRequestTable.createRow(element, poolId));
    super(rows, columns);
    this.pagination = resource.pagination;  }

  private static createRow(request: PoolCleanupRequest, poolId: number): Row<PoolCleanupRequest> {
    const row = new Row(request);
    row.addLink('id', RouteFactory.toCleanupRequest(poolId, request.id));
    return row;
  }
}
