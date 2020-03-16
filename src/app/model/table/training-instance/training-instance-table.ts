import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from '../../training/training-instance';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../rows/training-instance-row-adapter';
import {defer, of} from 'rxjs';
import {RouteFactory} from '../../routes/route-factory';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {EditAction} from '../actions/edit-action';
import {DeleteAction} from '../actions/delete-action';
import {DownloadAction} from '../actions/download-action';

export class TrainingInstanceTable extends Kypo2Table<TrainingInstanceRowAdapter> {

  constructor(resource: KypoPaginatedResource<TrainingInstance>, service: TrainingInstanceOverviewService) {
    const columns = [
      new Column('id', 'Id', true),
      new Column('title', 'Title', true),
      new Column('date', 'Date', true, 'startTime'),
      new Column('tdTitle', 'Training Definition', false),
      new Column('poolId', 'Pool ID', false),
      new Column('poolSize', 'Pool Size', false),
      new Column('accessToken', 'Access Token', false)
    ];
    const rows = resource.elements.map(element => TrainingInstanceTable.createRow(element, service));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterLabel = 'Filter by title';
    this.filterable = true;
    this.selectable = false;

  }

  private static createRow(ti: TrainingInstance, service: TrainingInstanceOverviewService): Row<TrainingInstanceRowAdapter> {
    const row = new Row(new TrainingInstanceRowAdapter(ti), this.createActions(ti, service));
    row.element.poolSize = service.getPoolState(ti.poolId);
    row.addLink('title', RouteFactory.toTrainingInstanceDetail(ti.id));
    row.addLink('poolId', RouteFactory.toPool(ti.poolId));
    row.addLink('accessToken', RouteFactory.toTrainingInstanceAccessToken(ti.id));
    return row;
  }

  private static createActions(ti: TrainingInstance, service: TrainingInstanceOverviewService): RowAction[] {
    return [
      new EditAction(
        'Edit training instance',
        of(false),
        defer(() => service.edit(ti.id))
      ),
      new DeleteAction(
        'Delete training instance',
        of(false),
        defer(() => service.delete(ti.id))
      ),
      new DownloadAction(
        'Download ZIP file containing all training instance data',
        of(false),
        defer(() => service.download(ti.id))
      )
    ];
  }
}
