import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {PaginatedResource} from '../other/paginated-resource';
import {ActiveTrainingRunRowAdapter} from '../row/active-training-run-row-adapter';
import {TrainingRunTableRow} from '../row/training-run-table-row';
import {ActiveTrainingRunService} from '../../../services/training-run/active/active-training-run.service';
import {DeleteAction} from '../actions/delete-action';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class ActiveTrainingRunTable extends Kypo2Table<ActiveTrainingRunRowAdapter>{


  constructor(resource: PaginatedResource<TrainingRunTableRow>, service: ActiveTrainingRunService) {
    const columns =    [
      new Column('sandboxId', 'sandbox ID', false),
      new Column('sandboxState', 'sandbox state', false),
      new Column('player', 'player', false),
      new Column('state', 'training run state', false),
    ];
    const rows = resource.elements.map(element => ActiveTrainingRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRunTableRow, service: ActiveTrainingRunService): Row<ActiveTrainingRunRowAdapter> {
    return new Row(
      new ActiveTrainingRunRowAdapter(element.trainingRun, element.deletionRequested),
      this.createActions(element, service)
    );
  }

  private static createActions(element: TrainingRunTableRow, service: ActiveTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of active training run',
        of(false),
        defer(() => service.deleteSandbox(element.trainingRun))
      )
    ];
  }
}
