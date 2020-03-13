import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {FlagCheck} from '../../../model/level/flag-check';
import {GameLevel} from '../../../model/level/game-level';
import {Hint} from '../../../model/level/hint';
import {TrainingRunGameLevelService} from '../../training-run/running/training-run-game-level.service';
import {switchMap, tap} from 'rxjs/operators';
import {CsirtMuDialogResultEnum} from 'csirt-mu-common';
import {HintButton} from '../../../model/level/hint-button';
import {MatDialog} from '@angular/material/dialog';
import {RunningTrainingRunService} from '../../training-run/running/running-training-run.service';

@Injectable()
/**
 * Mocks behavior of training run game level service connected to backend for designers preview purposes
 */
export class PreviewGameLevelService extends TrainingRunGameLevelService {


  constructor(protected dialog: MatDialog,
              protected runningTrainingRunService: RunningTrainingRunService) {
    super(dialog, runningTrainingRunService);
  }

  private _currentLevel: GameLevel;
  private _remainingAttempts =  -1;

  init(level: GameLevel) {
    super.init(level);
    this._currentLevel = level;
    this._remainingAttempts = this._currentLevel.incorrectFlagLimit;
  }

  revealSolution(level: GameLevel): Observable<string> {
    return this.displayRevealSolutionDialog(level.solutionPenalized)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.takeSolution()
          : EMPTY)
      );
  }

  revealHint(hint: Hint): Observable<Hint> {
    return this.displayTakeHintDialog(hint)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.takeHint(hint)
          : EMPTY)
      );
  }

  submitFlag(flag: string): Observable<any> {
    const result = new FlagCheck();
    if (flag && flag.toLowerCase() === this._currentLevel.flag.toLowerCase()) {
      result.isCorrect = true;
      result.remainingAttempts = 0;
      return this.onCorrectFlagSubmitted();
    } else {
      result.isCorrect = false;
      this._remainingAttempts--;
      result.remainingAttempts = this._remainingAttempts;
      result.solution = this._currentLevel.solution;
      return this.onWrongFlagSubmitted(result);
    }
  }

  private takeSolution(): Observable<string> {
    return of(this._currentLevel.solution)
      .pipe(
        tap(_ => this.onSolutionRevealed(this._currentLevel.solution))
      );
  }

  private takeHint(hintToTake: Hint): Observable<Hint> {
    return of(this._currentLevel.hints.find(hint => hint.id === hintToTake.id))
      .pipe(
        tap(takenHint => this.onHintRevealed(takenHint))
      );
  }

  protected initSolutionState(level: GameLevel) {
  }

  protected initHints(hints: Hint[]) {
    const hintButtons = hints.map(hint => new HintButton(false, hint));
    this.hintsSubject$.next(hintButtons);
  }
}
