import {
  Component, ElementRef, HostListener, Input, OnChanges,
  OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {takeWhile} from 'rxjs/operators';
import {FlagCheck} from '../../../../../model/level/flag-check';
import {GameLevel} from '../../../../../model/level/game-level';
import {Hint} from '../../../../../model/level/hint';
import {HintButton} from '../../../../../model/level/hint-button';
import {HintDialogData} from '../../../../../model/level/hint-dialog-data';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {RunningTrainingRunService} from '../../../../../services/training-run/running/running-training-run.service';
import {TrainingRunGameLevelService} from '../../../../../services/training-run/running/training-run-game-level.service';
import {BaseComponent} from '../../../../base.component';
import {RevealHintDialogComponent} from './user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component';
import {RevealSolutionDialogComponent} from './user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component';
import {WrongFlagDialogComponent} from './user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component';
import {ASCPECT_RATIO_Y, ASPECT_RATIO_X, DIVIDE_BY, WINDOW_WIDTH} from './game-level.constants';
import {Kypo2TopologyErrorService} from 'kypo2-topology-graph';

@Component({
  selector: 'kypo2-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css'],
})
/**
 * Component of a game level in a training run. Users needs to find out correct solution (flag) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class GameLevelComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() level: GameLevel;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  sandboxId: number;
  topologyWidth: number;
  topologyHeight: number;
  hasNextLevel: boolean;
  isPreviewMode: boolean;

  displayedText: string;
  displayedHints: string;
  flag: string;
  correctFlag: boolean;
  solutionShown: boolean;
  waitingOnResponse: boolean;
  hintButtons = Array<HintButton>();

  constructor(private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
            private gameLevelService: TrainingRunGameLevelService,
            private activeLevelService: RunningTrainingRunService,
            private topologyErrorService: Kypo2TopologyErrorService,
            private errorHandlerService: ErrorHandlerService) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize();
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.init();
    }
  }

  /**
   * Displays popup dialog asking for users confirmation of the action. If the action is confirmed by user,
   * selected hint is displayed and information about penalty for taking the hint send to the endpoint
   * @param hintButton hint button clicked by the user
   * @param index index of the hint (order)
   */
  showHint(hintButton, index: number) {
    const dialogRef = this.dialog.open(RevealHintDialogComponent, {
      data: new HintDialogData(hintButton.hint.title, hintButton.hint.penalty)
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToShowHint(hintButton, index);
      }
    });
  }

  /**
   * Displays popup dialog asking for users confirmation of the action. If the action is confirmed by user,
   * the solution is displayed.
   */
  revealSolution() {
    const dialogRef = this.dialog.open(RevealSolutionDialogComponent, {
      data: {
        title: 'solution',
        isPenalized: this.level.solutionPenalized,
      }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToRevealSolution();
      }
    });
  }

  /**
   * Calls service to check whether the flag is correct, displays the result to the user and if flag was correct, moves to the next level
   */
  submitFlag() {
    this.gameLevelService.isCorrectFlag(this.activeLevelService.trainingRunId, this.flag)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {
            if (resp.isCorrect) {
              this.onCorrectFlagSubmitted();
            } else {
              this.onWrongFlagSubmitted(resp);
            }
          },
        err => this.errorHandler.display(err, 'Submitting flag')
      );
  }

  /**
   * Calls service to move to the next level
   */
  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Moving to next level')
      );
  }

  /**
   * Calls service to finish the training
   */
  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Finishing training')
      );
  }


  private init() {
    this.sandboxId = this.activeLevelService.sandboxInstanceId;
    this.isPreviewMode = this.sandboxId === null || this.sandboxId === undefined;
    this.correctFlag = false;
    this.solutionShown = false;
    this.displayedHints = '';
    this.calculateTopologySize();
    this.displayedText = this.level.content;
    this.hasNextLevel = this.activeLevelService.hasNextLevel();
    this.initHintButtons();
    if (!this.isPreviewMode && this.level.hasSolution()) {
      this.showSolution();
    }
    this.subscribeToTopologyErrorHandler();
  }

  private showSolution(solution: string = null) {
    if (solution !== null && solution !== undefined) {
      this.level.solution = solution;
    }
    this.displayedHints = this.level.solution;
    this.solutionShown = true;
  }

  private calculateHeightWith43AspectRatio(width: number): number {
      return (width / ASPECT_RATIO_X) * ASCPECT_RATIO_Y;
  }

  private onCorrectFlagSubmitted() {
    this.correctFlag = true;
    this.flag = '';
    if (this.hasNextLevel) {
      this.nextLevel();
    } else {
      this.finish();
    }
  }

  private onWrongFlagSubmitted(flagCheck: FlagCheck) {
    this.flag = '';
    if (!this.solutionShown && flagCheck.remainingAttempts === 0) {
      this.showSolution(flagCheck.solution);
    }
    this.dialog.open(WrongFlagDialogComponent, {
      data: {
         remainingAttempts: flagCheck.remainingAttempts,
      }
    });
  }

  private sendRequestToRevealSolution() {
    this.waitingOnResponse = true;
    this.gameLevelService.takeSolution(this.activeLevelService.trainingRunId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
        this.showSolution(resp);
        this.waitingOnResponse = false;
      },
      err => {
        this.waitingOnResponse = false;
        this.errorHandler.display(err, 'Loading solution');
      });
  }

  private sendRequestToShowHint(hintButton, index: number) {
    this.waitingOnResponse = true;
    this.gameLevelService.takeHint(this.activeLevelService.trainingRunId, hintButton.hint.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
          hintButton.displayed = true;
          this.waitingOnResponse = false;
          this.addHintToTextField(resp, index);
        },
        err => {
          this.errorHandler.display(err, 'Taking hint "' + hintButton.hint.title + '"');
          this.waitingOnResponse = false;
        });
  }

  /**
   * Initializes hint buttons from hints of the game level
   */
  private initHintButtons() {
    this.hintButtons = [];
    this.level.hints.forEach((hint, index) => {
        this.hintButtons.push(new HintButton(!this.isPreviewMode && hint.hasContent(), hint));
        if (!this.isPreviewMode && hint.hasContent()) {
          this.addHintToTextField(hint, index);
        }
    });
  }

  private addHintToTextField(hint: Hint, order: number) {
    this.displayedHints += '\n\n## Hint ' + order + ': ' + hint.title + '\n' + hint.content;
  }

  private calculateTopologySize() {
    this.topologyWidth = window.innerWidth >= WINDOW_WIDTH ?
      this.rightPanelDiv.nativeElement.getBoundingClientRect().width :
      (window.innerWidth / DIVIDE_BY);
    this.topologyHeight = this.calculateHeightWith43AspectRatio(this.topologyWidth);
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe({
      next: event => this.errorHandlerService.display(event.err, event.action),
      error: err => this.errorHandlerService.display(err, 'There is a problem with topology error handler.'),
    });
  }
}
