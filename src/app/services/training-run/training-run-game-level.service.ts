import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FlagCheck} from '../../model/level/flag-check';
import {Hint} from '../../model/level/hint';
import {TrainingRunFacade} from '../facades/training-run-facade.service';

@Injectable()
/**
 * Handles events and actions specific for game level in training run
 */
export class TrainingRunGameLevelService {

  constructor(private trainingRunFacade: TrainingRunFacade) {

  }

  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck>  {
    return this.trainingRunFacade.isCorrectFlag(trainingRunId, flag);
  }

  takeSolution(trainingRunId: number): Observable<string> {
    return this.trainingRunFacade.takeSolution(trainingRunId);
  }

  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.trainingRunFacade.takeHint(trainingRunId, hintId);
  }
}
