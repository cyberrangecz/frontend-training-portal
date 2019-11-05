import {
  Component, ElementRef, HostListener, Input, OnChanges,
  OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {takeWhile} from 'rxjs/operators';
import {FlagCheck} from '../../../../../model/level/flag-check';
import {GameLevel} from '../../../../../model/level/game-level';
import {Hint} from '../../../../../model/level/hint';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {ActiveTrainingRunService} from '../../../../../services/training-run/active-training-run.service';
import {TrainingRunGameLevelService} from '../../../../../services/training-run/training-run-game-level.service';
import {BaseComponent} from '../../../../base.component';
import {RevealHintDialogComponent} from './user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component';
import {RevealSolutionDialogComponent} from './user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component';
import {WrongFlagDialogComponent} from './user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component';
import {ASCPECT_RATIO_Y, ASPECT_RATIO_X, DIVIDE_BY, WINDOW_WIDTH} from './game-level.constants';
import {Kypo2TopologyErrorService, TopologyError} from 'kypo2-topology-graph';

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
  isTopologyLoaded: boolean;
  hasNextLevel: boolean;
  isPreviewMode: boolean;

  displayedText: string;
  displayedHints: string;
  flag: string;
  correctFlag: boolean;
  solutionShown: boolean;
  waitingOnResponse: boolean;
  hintButtons = [];

  constructor(private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
            private gameLevelService: TrainingRunGameLevelService,
            private activeLevelService: ActiveTrainingRunService,
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

  topologyLoaded() {
    this.isTopologyLoaded = true;
  }


  /**
   * Displays popup dialog asking for users confirmation of the action. If the action is confirmed by user,
   * selected hint is displayed and information about penalty for taking the hint send to the endpoint
   * @param hintButton hint button clicked by the user
   * @param {number} index index of the hint (order)
   */
  showHint(hintButton, index: number) {
    const dialogRef = this.dialog.open(RevealHintDialogComponent, {
      data: {
        title: hintButton.hint.title,
        penalty: hintButton.hint.penalty
      }
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
   * Checks whether the flag is correct and perform appropriate actions
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

  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Moving to next level')
      );
  }

  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Finishing training')
      );
  }


  private init() {
    this.isPreviewMode = this.sandboxId === null || this.sandboxId === undefined;
    this.correctFlag = false;
    this.solutionShown = false;
    this.isTopologyLoaded = false;
    this.displayedHints = '';
    this.calculateTopologySize();
    this.sandboxId = this.activeLevelService.sandboxInstanceId;
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

  /**
   * Calculates height by already assigned width to keep 4:3 aspect ratio
   * @param width
   */
  private calculateHeightWith43AspectRatio(width: number): number {
      return (width / ASPECT_RATIO_X) * ASCPECT_RATIO_Y;
  }

  /**
   * The level is unlocked and the user can continue to the next one
   */
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
        this.hintButtons.push(
          {
            displayed: !this.isPreviewMode && hint.hasContent(),
            hint: hint
          });
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
