import {defer, Observable} from 'rxjs';
import {TrainingInstanceSummaryService} from '../../../../services/training-instance/summary/training-instance-summary.service';
import {KypoControlItem} from 'kypo-controls';

export class TrainingInstanceSummaryControls {

  static readonly PROGRESS_ACTION_ID = 'progress';
  static readonly RESULTS_ACTION_ID = 'results';

  static create(service: TrainingInstanceSummaryService, progressDisabled$: Observable<boolean>, resultsDisabled$: Observable<boolean>): KypoControlItem[] {
    return [
      new KypoControlItem(
        this.PROGRESS_ACTION_ID,
        'Show Progress',
        'primary',
        progressDisabled$,
        defer(() => service.showProgress())
      ),
      new KypoControlItem(
        this.RESULTS_ACTION_ID,
        'Show Results',
        'primary',
        resultsDisabled$,
        defer(() => service.showResults())
      ),
    ];
  }
}
