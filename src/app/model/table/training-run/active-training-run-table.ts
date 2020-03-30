import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {TrainingRunRowAdapter} from '../rows/training-run-row-adapter';
import {ActiveTrainingRunService} from '../../../services/training-run/active/active-training-run.service';
import {DeleteAction} from 'kypo2-table';
import {TrainingRun} from '../../training/training-run';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class ActiveTrainingRunTable extends Kypo2Table<TrainingRunRowAdapter> {


  constructor(resource: KypoPaginatedResource<TrainingRun>, service: ActiveTrainingRunService) {
    const columns =    [
      new Column('sandboxId', 'sandbox ID', false),
      new Column('player', 'player', false),
      new Column('state', 'training run state', false),
    ];
    const rows = resource.elements.map(element => ActiveTrainingRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: ActiveTrainingRunService): Row<TrainingRunRowAdapter> {
    return new Row(new TrainingRunRowAdapter(element),
      this.createActions(element, service)
    );
  }

  private static createActions(element: TrainingRun, service: ActiveTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of active training run',
        of(false),
        defer(() => service.deleteSandbox(element))
      )
    ];
  }
}
