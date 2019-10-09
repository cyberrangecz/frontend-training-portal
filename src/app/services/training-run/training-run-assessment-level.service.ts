import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {TrainingRunFacade} from '../facades/training-run-facade.service';

@Injectable()
/**
 * Handles events and actions specific for assessment level in training run
 */
export class TrainingRunAssessmentLevelService {

  constructor(private trainingRunFacade: TrainingRunFacade) {

  }

  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return this.trainingRunFacade.submitAnswers(trainingRunId, answers);
  }
}
