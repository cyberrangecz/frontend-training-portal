import {
  Component, ElementRef, HostListener, Input, OnChanges,
  OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {ActiveTrainingRunService} from "../../../../../services/trainee/active-training-run.service";
import { MatDialog } from "@angular/material/dialog";
import {RevealHintDialogComponent} from "./user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import {RevealSolutionDialogComponent} from "./user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component";
import {WrongFlagDialogComponent} from "./user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingRunGameLevelService} from "../../../../../services/trainee/training-run-game-level.service";
import {Hint} from "../../../../../model/level/hint";
import {FlagCheck} from "../../../../../model/level/flag-check";
import {BaseComponent} from "../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'training-run-game-level',
  templateUrl: './training-run-game-level.component.html',
  styleUrls: ['./training-run-game-level.component.css'],
})
/**
 * Component of a game level in a training run. Users needs to find out correct solution (flag) and submit it
 * before he can continue to the next level.
 */
export class TrainingRunGameLevelComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('level') level: GameLevel;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize()
  }

  sandboxId: number;
  topologyWidth: number;
  topologyHeight: number;
  isGameDataLoaded: boolean;
  isTopologyLoaded: boolean;
  hasNextLevel: boolean;
  isPreviewMode: boolean;

  displayedText: string;
  displayedHints: string;
  flag: string;
  correctFlag: boolean;
  solutionShown: boolean;
  hintButtons = [];

  constructor(private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
            private router: Router,
            private activeRoute: ActivatedRoute,
            private gameLevelService: TrainingRunGameLevelService,
            private activeLevelService: ActiveTrainingRunService) {
    super();
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
        penalty: hintButton.hint.hintPenalty
      }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToShowHint(hintButton, index);
      }
    })
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
    })
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
              this.onWrongFlagSubmitted(resp)
            }
          },
        err => this.errorHandler.displayInAlert(err, 'Submitting flag')
      );
  }

  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.displayInAlert(err, 'Moving to next level')
      )
  }

  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.displayInAlert(err, 'Finishing training')
      )
  }


  private init() {
    this.isPreviewMode = this.sandboxId === null || this.sandboxId === undefined;
    this.correctFlag = false;
    this.solutionShown = false;
    this.isGameDataLoaded = true;
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

  private onWrongFlagSubmitted(flagCheck: FlagCheck) {
    this.flag = "";
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
    this.isGameDataLoaded = false;
    this.gameLevelService.takeSolution(this.activeLevelService.trainingRunId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
        this.showSolution(resp);
        this.isGameDataLoaded = true;
      },
      err => {
        this.isGameDataLoaded = true;
        this.errorHandler.displayInAlert(err, "Loading solution");
      })
  }

  private sendRequestToShowHint(hintButton, index: number) {
    this.gameLevelService.takeHint(this.activeLevelService.trainingRunId, hintButton.hint.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
          hintButton.displayed = true;
          this.addHintToTextField(resp, index);
        },
        err => {
          this.errorHandler.displayInAlert(err, 'Taking hint "' + hintButton.hint.title + '"');
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
    this.displayedHints += '\n\n## Hint ' + order + ": " + hint.title + "\n" + hint.content;
  }

  private calculateTopologySize() {
    this.topologyWidth = window.innerWidth >= 1920 ? this.rightPanelDiv.nativeElement.getBoundingClientRect().width : (window.innerWidth / 2);
    this.topologyHeight = this.calculateHeightWith43AspectRatio(this.topologyWidth);
  }
}
