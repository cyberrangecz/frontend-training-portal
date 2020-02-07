import {PaginatedResource} from '../other/paginated-resource';
import {TrainingInstance} from '../../training/training-instance';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../row/training-instance-row-adapter';
import {of} from 'rxjs';
import {RouteFactory} from '../../routes/route-factory';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';

export class TrainingInstanceTableCreator {

  static readonly EDIT_ACTION_ID = 'edit';
  static readonly DELETE_ACTION_ID = 'delete';
  static readonly ARCHIVE_ACTION_ID = 'archive';

  static create(resource: PaginatedResource<TrainingInstance>,
                trainingInstanceService: TrainingInstanceOverviewService): Kypo2Table<TrainingInstanceRowAdapter> {
    const actions = [
      {
        id: this.EDIT_ACTION_ID,
        label: 'Edit',
        icon: 'create',
        color: 'primary',
        tooltip: 'Edit training instance',
        disabled$: of(false)
      },
      {
        id: this.DELETE_ACTION_ID,
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        tooltip: 'Delete training instance',
        disabled$: of(false)
      },
      {
        id: this.ARCHIVE_ACTION_ID,
        label: 'Archive',
        icon: 'archive',
        color: 'primary',
        tooltip: 'Download zip file containing all training instance files',
        disabled$: of(false)
      },
    ];

    const columns = [
      new Column('id', 'Id', true),
      new Column('title', 'Title', true),
      new Column('date', 'Date', true, 'startTime'),
      new Column('tdTitle', 'Training Definition', false),
      new Column('poolId', 'Pool ID', false),
      new Column('poolSize', 'Pool Size', false),
      new Column('accessToken', 'Access Token', false)
    ];

    const rows = resource.elements
        .map(trainingInstance => {
          const row = new Row(new TrainingInstanceRowAdapter(trainingInstance), actions);
          row.element.poolSize = trainingInstanceService.getPoolState(trainingInstance.poolId);
          row.addLink('title', RouteFactory.toTrainingInstanceDetail(trainingInstance.id));
          row.addLink('poolId', RouteFactory.toPool(trainingInstance.poolId));
          row.addLink('accessToken', RouteFactory.toTrainingInstanceAccessToken(trainingInstance.id));
          return row;
        });

    const table = new Kypo2Table<TrainingInstanceRowAdapter>(rows, columns);
    table.pagination = resource.pagination;
    table.filterLabel = 'Filter by title';
    table.filterable = true;
    table.selectable = false;
    return table;
  }
}
