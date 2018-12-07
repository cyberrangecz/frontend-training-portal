import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";
import {MatDialog} from "@angular/material";
import {RevealHintDialogComponent} from "./user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import {RevealSolutionDialogComponent} from "./user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component";
import {WrongFlagDialogComponent} from "./user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component";
import {TrainingRunSetterService} from "../../../../../services/data-setters/training-run.setter.service";
import {ComponentErrorHandlerService} from "../../../../../services/component-error-handler.service";

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
export class TrainingRunGameLevelComponent implements OnInit {

  @Input('level') level: GameLevel;
  @Output('nextLevel') nextLevel: EventEmitter<number> = new EventEmitter<number>();

  graphWidth: number;
  graphHeight: number;

  isLoading = false;

  displayedText: string;
  flag: string;
  correctFlag = false;
  solutionShown = false;
  hintButtons = [];

  constructor(
    private dialog: MatDialog,
    private trainingRunSetter: TrainingRunSetterService,
    private errorHandler: ComponentErrorHandlerService,
    private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.setGraphTopologyElementSize(window.innerWidth, window.innerHeight);

    this.displayedText = this.level.content;
    this.initHintButtons();
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
        this.displayedText += '\n\n## <span style="color:slateblue">Hint ' + index + ": " + hintButton.hint.title + "</span>\n" + hintButton.hint.content;
        hintButton.displayed = true;
        // TODO: Call REST to inform about hint taken
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
  showSolutionButtonClick() {
    const dialogRef = this.dialog.open(RevealSolutionDialogComponent, {
      data: {
        title: 'solution',
        isPenalized: this.level.solutionPenalized,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.revealSolution();
        // TODO: Call REST to inform about solution taken
      }
    })
  }

  /**
   * Checks whether the flag is correct and perform appropriate actions
   */
  submitFlag() {
    if (this.flag === this.level.flag) {
      this.runActionsAfterCorrectFlagSubmitted();
    } else {
      this.runActionsAfterWrongFlagSubmitted()
    }
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
  private runActionsAfterCorrectFlagSubmitted() {
    // TODO: Call REST to update incorrect flag count
    //this.level.incorrectFlagCount = 0;
    this.activeLevelService.unlockCurrentLevel();
    this.correctFlag = true;
   // this.nextLevel.emit(this.level.order + 1);
  }

  /**
   * otherwise popup dialog informing the user about penalty for submitting incorrect flag is displayed and the information
   * is send to the endpoint
   */
  private runActionsAfterWrongFlagSubmitted() {
    // TODO: redesign the solution to match current REST API functionality
/*    if (!this.solutionShown) {
      this.level.incorrectFlagCount++;
      if (this.level.incorrectFlagCount === this.level.incorrectFlagLimit) {
        this.revealSolution();
      }
    }*/

    const dialogRef = this.dialog.open(WrongFlagDialogComponent, {
      data: {
        // incorrectFlagCount: this.level.incorrectFlagCount,
        incorrectFlagLimit: this.level.incorrectFlagLimit
      }
    });
  }

  /**
   * Reveals solution text and deducts points if solution is penalized
   */
  private revealSolution() {
    this.isLoading = true;
    if (this.level.solutionPenalized) {
      let pointsToDeduct = this.level.maxScore - this.hintButtons
        .map(hintButton => hintButton.displayed ? hintButton.hint.hintPenalty : 0)
        .reduce((sum, currentHintPoints) => sum + currentHintPoints);
    }
    this.trainingRunSetter.takeSolution(this.activeLevelService.trainingRunId)
      .subscribe(resp => {
        this.solutionShown = true;
        this.displayedText = this.level.solution;
        // TODO: deduct remaining points (via REST?)
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.errorHandler.displayHttpError(err, "Loading solution");
      })

  }


  /**
   * Initializes hint buttons from hints of the game level
   */
  private initHintButtons() {
    this.level.hints.forEach(hint =>
      this.hintButtons.push(
        {
          displayed: false,
          hint: hint
        })
    );
  }
}
