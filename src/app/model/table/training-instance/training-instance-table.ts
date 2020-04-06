import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from 'kypo-training-model';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../rows/training-instance-row-adapter';
import {defer, of} from 'rxjs';
import {RouteFactory} from '../../routes/route-factory';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {EditAction} from 'kypo2-table';
import {DeleteAction} from 'kypo2-table';
import {DownloadAction} from 'kypo2-table';
import {SandboxNavigator} from 'kypo-sandbox-agenda';

export class TrainingInstanceTable extends Kypo2Table<TrainingInstanceRowAdapter> {

  constructor(resource: KypoPaginatedResource<TrainingInstance>, service: TrainingInstanceOverviewService, sandboxNavigator: SandboxNavigator) {
    const columns = [
      new Column('id', 'Id', true),
      new Column('title', 'Title', true),
      new Column('date', 'Date', true, 'startTime'),
      new Column('tdTitle', 'Training Definition', false),
      new Column('poolId', 'Pool ID', false),
      new Column('poolSize', 'Pool Size', false),
      new Column('accessToken', 'Access Token', false)
    ];
    const rows = resource.elements.map(element => TrainingInstanceTable.createRow(element, service, sandboxNavigator));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterLabel = 'Filter by title';
    this.filterable = true;
    this.selectable = false;
  }

  private static createRow(ti: TrainingInstance, service: TrainingInstanceOverviewService, sandboxNavigator: SandboxNavigator): Row<TrainingInstanceRowAdapter> {
    const row = new Row(new TrainingInstanceRowAdapter(ti), this.createActions(ti, service));
    row.addLink('title', RouteFactory.toTrainingInstanceDetail(ti.id));
    row.addLink('accessToken', RouteFactory.toTrainingInstanceAccessToken(ti.id));
    if (ti.hasPool()) {
      row.element.poolSize = service.getPoolState(ti.poolId);
      row.addLink('poolId', sandboxNavigator.toPool(ti.poolId));
    } else {
      row.element.poolSize = of('-');
    }
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
