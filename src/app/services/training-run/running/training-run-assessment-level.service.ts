import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractQuestion} from '../../../model/questions/abstract-question';
import {TrainingRunApi} from '../../api/training-run-api.service';

@Injectable()
/**
 * Handles events and actions specific for assessment level in training run
 */
export class TrainingRunAssessmentLevelService {

  constructor(private trainingRunFacade: TrainingRunApi) {
  }

  /**
   * Submit answers entered by trainee
   * @param trainingRunId id of current training run
   * @param answers answers entered by user
   */
  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return this.trainingRunFacade.submitAnswers(trainingRunId, answers);
  }
}
