import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../../../model/questions/question';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {TrainingRunAssessmentLevelService} from './training-run-assessment-level.service';
import {RunningTrainingRunService} from './running-training-run.service';
import {switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../../shared/error-handler.service';

/**
 * Handles events and actions specific for assessment level in training run
 */
@Injectable()
export class TrainingRunAssessmentLevelConcreteService extends TrainingRunAssessmentLevelService {

  constructor(private api: TrainingRunApi,
              private errorHandler: ErrorHandlerService,
              private runningTrainingRunService: RunningTrainingRunService) {
    super();
  }

  /**
   * Submit answers entered by trainee
   * @param answers answers entered by user
   */
  submit(answers: Question[]): Observable<any> {
    return this.api.submitAnswers(this.runningTrainingRunService.trainingRunId, answers)
      .pipe(
        tap(_ => _,
          err => this.errorHandler.emit(err, 'Submitting answers')
        ),
        switchMap(_ => this.runningTrainingRunService.next())
      );
  }
}
