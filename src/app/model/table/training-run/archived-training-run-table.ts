import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {ActiveTrainingRunRowAdapter} from '../row/active-training-run-row-adapter';
import {PaginatedResource} from '../other/paginated-resource';
import {TrainingRunTableRow} from '../row/training-run-table-row';
import {ArchivedTrainingRunService} from '../../../services/training-run/archived/archived-training-run.service';
import {DeleteAction} from '../actions/delete-action';
import {defer, of} from 'rxjs';

export class ArchivedTrainingRunTable extends Kypo2Table<ActiveTrainingRunRowAdapter> {

  constructor(resource: PaginatedResource<TrainingRunTableRow>, service: ArchivedTrainingRunService) {
    const columns = [
      new Column('player', 'player', false),
      new Column('state', 'training run state', false),
    ];
    const rows = resource.elements.map(element => ArchivedTrainingRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = true;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRunTableRow, service: ArchivedTrainingRunService): Row<ActiveTrainingRunRowAdapter> {
    return new Row(
      new ActiveTrainingRunRowAdapter(element.trainingRun, element.deletionRequested),
      this.createActions(element, service)
    );
  }

  private static createActions(element: TrainingRunTableRow, service: ArchivedTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete archived training run',
        of(false),
        defer(() => service.delete(element.trainingRun.id))
      )
    ];
  }
}
