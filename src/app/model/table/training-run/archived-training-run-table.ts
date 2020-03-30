import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {TrainingRunRowAdapter} from '../rows/training-run-row-adapter';
import {KypoPaginatedResource} from 'kypo-common';
import {ArchivedTrainingRunService} from '../../../services/training-run/archived/archived-training-run.service';
import {DeleteAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {TrainingRun} from '../../training/training-run';

export class ArchivedTrainingRunTable extends Kypo2Table<TrainingRunRowAdapter> {

  constructor(resource: KypoPaginatedResource<TrainingRun>, service: ArchivedTrainingRunService) {
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

  private static createRow(element: TrainingRun, service: ArchivedTrainingRunService): Row<TrainingRunRowAdapter> {
    return new Row(new TrainingRunRowAdapter(element),
      this.createActions(element, service)
    );
  }

  private static createActions(element: TrainingRun, service: ArchivedTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete archived training run',
        of(false),
        defer(() => service.delete(element.id))
      )
    ];
  }
}
