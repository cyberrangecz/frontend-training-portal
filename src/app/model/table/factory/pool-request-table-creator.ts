import {Column, Kypo2Table, Row} from 'kypo2-table';
import {RouteFactory} from '../../routes/route-factory';
import {PoolRequest} from '../../sandbox/pool/request/pool-request';
import {PaginatedResource} from '../other/paginated-resource';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class PoolRequestTableCreator {

  static readonly CANCEL_ACTION_ID = 'cancel';
  static readonly RETRY_ACTION_Id =  'retry';


  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   * @param poolId id of pool associated with resource
   * @param type type of request
   */
  static create(resource: PaginatedResource<PoolRequest>, poolId: number, type: 'CREATION' | 'CLEANUP'): Kypo2Table<PoolRequest> {
    const table = new Kypo2Table<PoolRequest>(
      this.createRows(resource, poolId, type),
      [
        new Column('id', 'id', false),
        new Column('createdAtFormatted', 'created', false),
      ]
    );
    table.pagination = resource.pagination;
    return table;
  }

  private static createRows(resource: PaginatedResource<PoolRequest>, poolId: number, type: 'CREATION' | 'CLEANUP'): Row<PoolRequest>[] {
    return resource.elements.map(request => {
      const row = new Row(request, []);
      if (type === 'CREATION') {
        row.addLink('id', RouteFactory.toCreationRequest(poolId, request.id));
      } else {
        row.addLink('id', RouteFactory.toCreationRequest(poolId, request.id));
      }
      return row;
    });
  }
}
