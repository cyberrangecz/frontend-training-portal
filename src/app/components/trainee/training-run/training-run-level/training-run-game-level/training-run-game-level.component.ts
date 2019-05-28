import {
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges,
} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {ActiveTrainingRunService} from "../../../../../services/trainee/active-training-run.service";
import {MatDialog} from "@angular/material";
import {RevealHintDialogComponent} from "./user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import {RevealSolutionDialogComponent} from "./user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component";
import {WrongFlagDialogComponent} from "./user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingRunGameLevelService} from "../../../../../services/trainee/training-run-game-level.service";

@Component({
  selector: 'training-run-game-level',
  templateUrl: './training-run-game-level.component.html',
  styleUrls: ['./training-run-game-level.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
/**
 * Component of a game level in a training run. Users needs to find out correct solution (flag) and submit it
 * before he can continue to the next level.
 */
export class TrainingRunGameLevelComponent implements OnInit, OnChanges {

  @Input('level') level: GameLevel;

  graphWidth: number;
  graphHeight: number;
  sandboxId: number;
  isGameDataLoaded = true;
  isTopologyLoaded = false;
  hasNextLevel: boolean;

  displayedText: string;
  flag: string;
  correctFlag = false;
  solutionShown = false;
  hintButtons = [];

  constructor(
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private gameLevelService: TrainingRunGameLevelService,
    private activeLevelService: ActiveTrainingRunService) { }

  ngOnInit() {
    this.init()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.init()
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
        penalty: hintButton.hint.hintPenalty
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToShowHint(hintButton, index);
      }
    })
  }

  /**
   * Recalculates width and height of the topology graph element after browser windows was resized
   * @param event browser window resize event
   */
  onResize(event) {
    this.setGraphTopologyElementSize(event.target.innerWidth, event.target.innerHeight);
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

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToRevealSolution();
      }
    })
  }

  /**
   * Checks whether the flag is correct and perform appropriate actions
   */
  submitFlag() {
    this.gameLevelService.isCorrectFlag(this.activeLevelService.trainingRunId, this.flag)
      .subscribe(
        resp => {
            if (resp.isCorrect) {
              this.onCorrectFlagSubmitted();
            } else {
              this.onWrongFlagSubmitted(resp.remainingAttempts)
            }
          },
        err => this.errorHandler.displayHttpError(err, 'Submitting flag')
      );
  }

  nextLevel() {
    this.activeLevelService.nextLevel()
      .subscribe(
        resp => {},
        err => this.errorHandler.displayHttpError(err, 'Moving to next level')
      )
  }

  finish() {
    this.activeLevelService.finish()
      .subscribe(
        resp => {},
        err => this.errorHandler.displayHttpError(err, 'Finishing training')
      )
  }


  private init() {
    this.sandboxId = this.activeLevelService.sandboxInstanceId;
    this.displayedText = this.level.content;
    this.correctFlag = false;
    this.hasNextLevel = this.activeLevelService.hasNextLevel();
    this.setGraphTopologyElementSize(window.innerWidth, window.innerHeight);
    this.initHintButtons();
  }

  /**
   * Calculates and sets width and height of the graph topology element
   * @param windowWidth width of the browser window
   * @param windowHeight height of the browser window
   */
  private setGraphTopologyElementSize(windowWidth: number, windowHeight: number) {
    if (windowWidth < 1000) {
      this.graphWidth = windowWidth / 1.2;
      this.graphHeight = this.calculateHeightWith43AspectRatio(this.graphWidth);
    } else {
      this.graphWidth = windowWidth / 1.7;
      this.graphHeight = this.calculateHeightWith43AspectRatio(this.graphWidth);
    }
  }

  /**
   * Calculates height by already assigned width to keep 4:3 aspect ratio
   * @param width
   */
  private calculateHeightWith43AspectRatio(width: number): number {
    return (width / 4) * 3;
  }

  /**
   * The level is unlocked and the user can continue to the next one
   */
  private onCorrectFlagSubmitted() {
    this.correctFlag = true;
    this.flag = "";
    if (this.hasNextLevel) {
      this.nextLevel();
    } else {
      this.finish();
    }
  }

  /**
   * otherwise popup dialog informing the user about penalty for submitting incorrect flag is displayed and the information
   * is send to the endpoint
   */
  private onWrongFlagSubmitted(remainingAttempts: number) {
    this.flag = "";
    if (!this.solutionShown) {
      if (remainingAttempts === 0) {
        this.sendRequestToRevealSolution();
      }
    }
    const dialogRef = this.dialog.open(WrongFlagDialogComponent, {
      data: {
         remainingAttempts: remainingAttempts,
      }
    });
  }

  private sendRequestToRevealSolution() {
    this.isGameDataLoaded = false;
    this.gameLevelService.takeSolution(this.activeLevelService.trainingRunId)
      .subscribe(resp => {
        this.solutionShown = true;
        this.displayedText = resp;
        this.isGameDataLoaded = true;
      },
      err => {
        this.isGameDataLoaded = true;
        this.errorHandler.displayHttpError(err, "Loading solution");
      })
  }

  private sendRequestToShowHint(hintButton, index: number) {
    this.gameLevelService.takeHint(this.activeLevelService.trainingRunId, hintButton.hint.id)
      .subscribe(resp => {
          hintButton.displayed = true;
          this.displayedText += '\n\n## Hint ' + index + ": " + resp.title + "\n" + resp.content;
        },
        err => {
          this.errorHandler.displayHttpError(err, 'Taking hint "' + hintButton.hint.title + '"');
        });
  }

  /**
   * Initializes hint buttons from hints of the game level
   */
  private initHintButtons() {
    this.hintButtons = [];
    this.level.hints.forEach(hint =>
      this.hintButtons.push(
        {
          displayed: false,
          hint: hint
        })
    );
  }

}
