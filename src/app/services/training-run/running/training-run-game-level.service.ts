import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FlagCheck} from '../../../model/level/flag-check';
import {Hint} from '../../../model/level/hint';
import {TrainingRunApi} from '../../api/training-run-api.service';

@Injectable()
/**
 * Handles events and actions specific for game level in training run
 */
export class TrainingRunGameLevelService {

  constructor(private trainingRunFacade: TrainingRunApi) {
  }

  /**
   * Evaluates if flag entered by trainee is correct
   * @param trainingRunId id of current training run
   * @param flag flag entered by trainee
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck>  {
    return this.trainingRunFacade.isCorrectFlag(trainingRunId, flag);
  }

  /**
   * Displays solution of current game level
   * @param trainingRunId id of current training run
   */
  takeSolution(trainingRunId: number): Observable<string> {
    return this.trainingRunFacade.takeSolution(trainingRunId);
  }

  /**
   * Displays selected hint
   * @param trainingRunId id of current training run
   * @param hintId if of selected hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.trainingRunFacade.takeHint(trainingRunId, hintId);
  }
}
