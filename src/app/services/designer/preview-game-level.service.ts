import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {FlagCheck} from "../../model/level/flag-check";
import {Hint} from "../../model/level/hint";
import {ActiveTrainingRunService} from "../trainee/active-training-run.service";
import {GameLevel} from "../../model/level/game-level";

@Injectable()
export class PreviewGameLevelService {

  private _currentLevel: GameLevel;
  private _remainingAttempts: number =  -1;

  init(level: GameLevel) {
    this._currentLevel = level;
    this._remainingAttempts = this._currentLevel.incorrectFlagLimit;
  }

  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck>  {
    const result = new FlagCheck();
    if (flag && flag.toLowerCase() === this._currentLevel.flag.toLowerCase()) {
      result.isCorrect = true;
      result.remainingAttempts = 0;
    } else {
      result.isCorrect = false;
      this._remainingAttempts--;
      result.remainingAttempts = this._remainingAttempts;
    }
    return of(result);

  }

  takeSolution(trainingRunId: number): Observable<string> {
    return of(this._currentLevel.solution);
  }

  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return of(this._currentLevel.hints.find(hint => hint.id === hintId));
  }
}
