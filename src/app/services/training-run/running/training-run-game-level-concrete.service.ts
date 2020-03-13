import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Hint} from '../../../model/level/hint';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {
  CsirtMuDialogResultEnum
} from 'csirt-mu-common';
import { switchMap, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {GameLevel} from '../../../model/level/game-level';
import {TrainingRunGameLevelService} from './training-run-game-level.service';
import {RunningTrainingRunService} from './running-training-run.service';

@Injectable()
/**
 * Handles events and actions specific for game level in training run
 */
export class TrainingRunGameLevelConcreteService extends TrainingRunGameLevelService {

  constructor(private api: TrainingRunApi,
              private errorHandler: ErrorHandlerService,
              protected dialog: MatDialog,
              protected runningTrainingRunService: RunningTrainingRunService) {
    super(dialog, runningTrainingRunService);
  }

  /**
   * Evaluates if flag entered by trainee is correct
   * @param flag flag entered by trainee
   */
  submitFlag(flag: string): Observable<any>  {
    this.isLoadingSubject$.next(true);
    return this.api.isCorrectFlag(this.runningTrainingRunService.trainingRunId, flag)
      .pipe(
        switchMap(flagCheckResult =>
            flagCheckResult.isCorrect
            ? this.onCorrectFlagSubmitted()
            : this.onWrongFlagSubmitted(flagCheckResult)
        ),
        tap(_ => this.isLoadingSubject$.next(false),
            err => {
              this.isLoadingSubject$.next(false);
              this.errorHandler.emit(err, 'Submitting flag');
        })
      );
  }

  /**
   * Displays solution of current game level
   */
  revealSolution(level: GameLevel): Observable<string> {
    return this.displayRevealSolutionDialog(level.solutionPenalized)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToRevealSolution(this.runningTrainingRunService.trainingRunId)
          : EMPTY)
      );
  }

  /**
   * Displays selected hint
   * @param hint  selected hint
   */
  revealHint(hint: Hint): Observable<Hint> {
    return this.displayTakeHintDialog(hint)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToTakeHint(this.runningTrainingRunService.trainingRunId, hint)
          : EMPTY)
      );
  }

  private callApiToRevealSolution(trainingRunId: number): Observable<string> {
    this.isLoadingSubject$.next(true);
    return this.api.takeSolution(trainingRunId)
      .pipe(
        tap(solution =>  {
            this.isLoadingSubject$.next(false);
            this.onSolutionRevealed(solution);
          },
            err => {
              this.isLoadingSubject$.next(false);
              this.errorHandler.emit(err, 'Revealing solution');
        })
      );
  }

  private callApiToTakeHint(trainingRunId: number, hint: Hint): Observable<Hint> {
    this.isLoadingSubject$.next(true);
    return this.api.takeHint(trainingRunId, hint.id)
      .pipe(
        tap( takenHint => {
            this.isLoadingSubject$.next(false);
            this.onHintRevealed(takenHint);
          },
            err => {
              this.isLoadingSubject$.next(false);
              this.errorHandler.emit(err, `Taking hint "${hint.title}"`);
        })
      );
  }
}
