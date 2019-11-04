import {AccessedTrainingRun} from './accessed-training-run';
import {PaginatedResource} from './paginated-resource';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {of} from 'rxjs';
import {TraineeAccessTrainingRunActionEnum} from '../enums/trainee-access-training-run-actions.enum';

export class TrainingRunOverviewTableCreator {
  static create(resource: PaginatedResource<AccessedTrainingRun[]>): Kypo2Table<AccessedTrainingRun> {

    const table = new Kypo2Table<AccessedTrainingRun>(
      resource.elements.map(trainingRun => new Row(trainingRun, this.createActions(trainingRun))),
      [
        new Column('trainingInstanceTitle', 'title', false),
        new Column('trainingInstanceFormattedDuration', 'Date', false),
        new Column('completedLevels', 'Completed Levels', false),
      ]
    );
    table.pagination = resource.pagination;
    table.filterable = false;
    table.selectable = false;
    return table;
  }

  private static createActions(trainingRun: AccessedTrainingRun) {
    let isResumeActionDisabled = true;
    let isResultActionDisabled = true;
    switch (trainingRun.action) {
      case TraineeAccessTrainingRunActionEnum.Resume: {
        isResumeActionDisabled = false;
        break;
      }
      case TraineeAccessTrainingRunActionEnum.Results: {
        isResultActionDisabled = false;
        break;
      }
    }
    return [
      {
        label: 'Resume',
        icon: 'open_in_new',
        color: 'primary',
        tooltip: 'Resume',
        disabled$: of(isResumeActionDisabled)
      },
      {
        label: 'Access results',
        icon: 'assessment',
        color: 'primary',
        tooltip: 'Access results',
        disabled$: of(isResultActionDisabled)
      }
    ];
  }
}
