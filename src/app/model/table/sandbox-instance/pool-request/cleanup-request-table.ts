import {KypoPaginatedResource} from 'kypo-common';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {RouteFactory} from '../../../routes/route-factory';
import {CleanupRequest} from 'kypo-sandbox-model';

export class CleanupRequestTable extends Kypo2Table<CleanupRequest> {
  constructor(resource: KypoPaginatedResource<CleanupRequest>, poolId: number) {
    const columns = [
      new Column('id', 'id', false),
      new Column('createdAtFormatted', 'created', false),
    ];
    const rows = resource.elements.map(element => CleanupRequestTable.createRow(element, poolId));
    super(rows, columns);
    this.pagination = resource.pagination;
  }

  private static createRow(request: CleanupRequest, poolId: number): Row<CleanupRequest> {
    const row = new Row(request);
    row.addLink('id', RouteFactory.toCleanupRequest(poolId, request.allocationUnitId, request.id));
    return row;
  }
}
