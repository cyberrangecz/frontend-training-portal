import {Column, Kypo2Table, Row} from 'kypo2-table';
import {of} from 'rxjs';
import {PaginatedResource} from '../other/paginated-resource';
import {TrainingRunTableAdapter} from '../row/training-run-table-adapter';
import {TrainingRunTableRow} from '../row/training-run-table-row';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class TrainingRunTableCreator {

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   * @param tableType whether to display in archived or active context
   */
  static create(resource: PaginatedResource<TrainingRunTableRow[]>, tableType: 'archived' | 'active'): Kypo2Table<TrainingRunTableAdapter> {

    const resources = this.mapTrainingRunTableRowToTrainingRunTableModel(resource);
    let table;

    const actions = [{
      label: 'Delete',
      icon: 'delete',
      color: 'warn',
      tooltip: 'Delete',
      disabled$: of(false)
    }];

    if (tableType === 'archived') {
      table = new Kypo2Table<TrainingRunTableAdapter>(
        resources.elements.map(trainingRun => new Row(trainingRun, actions)),
        [
          new Column('player', 'player', false),
          new Column('state', 'training run state', false),
        ]
      );
      table.selectable = true;
      table.pagination = resource.pagination;
      table.filterable = false;

    } else {
      table = new Kypo2Table<TrainingRunTableAdapter>(
        resources.elements.map(trainingRun => new Row(trainingRun, actions)),
        [
          new Column('sandboxId', 'sandbox ID', false),
          new Column('sandboxState', 'sandbox state', false),
          new Column('player', 'player', false),
          new Column('state', 'training run state', false),
        ]
      );
      table.selectable = false;
      table.pagination = resource.pagination;
      table.filterable = false;
    }
    return table;
  }

  private static mapTrainingRunTableRowToTrainingRunTableModel(runs: PaginatedResource<TrainingRunTableRow[]>)
    : PaginatedResource<TrainingRunTableAdapter[]> {
    const elements: TrainingRunTableAdapter[] = [];
    runs.elements.forEach( run => {
      elements.push(new TrainingRunTableAdapter(run.trainingRun, run.deletionRequested));
    });

    return new PaginatedResource<TrainingRunTableAdapter[]>(elements, runs.pagination);
  }
}
