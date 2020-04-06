import {AccessedTrainingRun} from 'kypo-training-model';
import {KypoPaginatedResource} from 'kypo-common';
import {Column, Kypo2Table, Row, RowAction} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {TraineeAccessTrainingRunActionEnum} from 'kypo-training-model';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class AccessedTrainingRunTable extends Kypo2Table<AccessedTrainingRun> {

  constructor(resource: KypoPaginatedResource<AccessedTrainingRun>, service: AccessedTrainingRunService) {
    const columns = [
      new Column('trainingInstanceTitle', 'title', false),
      new Column('trainingInstanceFormattedDuration', 'Date', false),
      new Column('completedLevels', 'Completed Levels', false),
    ];

    const rows = resource.elements.map(trainingRun =>
      new Row(trainingRun, AccessedTrainingRunTable.createActions(trainingRun, service)
      ));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
    this.selectable = false;
  }

  private static createActions(trainingRun: AccessedTrainingRun, service: AccessedTrainingRunService): RowAction[] {
    return [
      new RowAction(
        'resume',
        'Resume',
        'open_in_new',
        'primary',
        'Resume training run',
        of(trainingRun.action !== TraineeAccessTrainingRunActionEnum.Resume),
        defer(() => service.resume(trainingRun.trainingRunId))
      ),
      new RowAction(
        'results',
        'Access Results',
        'assessment',
        'primary',
        'Access Results',
        of(trainingRun.action !== TraineeAccessTrainingRunActionEnum.Results),
        defer(() => service.results(trainingRun.trainingRunId))
      )
    ];
  }
}
