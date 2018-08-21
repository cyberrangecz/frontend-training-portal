import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";
import {MatDialog} from "@angular/material";
import {UserActionDialogComponent} from "./user-action-dialog/user-action-dialog.component";

@Component({
  selector: 'training-run-game-level',
  templateUrl: './training-run-game-level.component.html',
  styleUrls: ['./training-run-game-level.component.css']
})
/**
 * Component of a game level in a training run. Users needs to find out correct solution (flag) and submit it
 * before he can continue to the next level.
 */
export class TrainingRunGameLevelComponent implements OnInit {

  @Input('level') level: GameLevel;

  @Output('nextLevel') nextLevel: EventEmitter<number> = new EventEmitter<number>();

  displayedText: string;
  flag: string;
  correctFlag = false;
  solutionShown = false;
  hintButtons = [];

  constructor(
    private dialog: MatDialog,
    private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.displayedText = this.level.content;
    this.initHintButtons()
  }

  /**
   * Displays popup dialog asking for users confirmation of the action. If the action is confirmed by user,
   * selected hint is displayed and information about penalty for taking the hint send to the endpoint
   * @param hintButton hint button clicked by the user
   * @param {number} index index of the hint (order)
   */
  showHint(hintButton, index: number) {
    const dialogRef = this.dialog.open(UserActionDialogComponent, {
      data: {
        title: hintButton.hint.title,
        dialogType: 'warning',
        dataType: 'hint',
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
   * Displays popup dialog asking for users confirmation of the action. If the action is confirmed by user,
   * the solution is  displayed and information about penalty for displaying the solutions is send to the endpoint
   */
  showSolution() {
    const dialogRef = this.dialog.open(UserActionDialogComponent, {
      data: {
        title: 'solution',
        dialogType: 'warning',
        dataType: 'solution',
        penalty: this.level.solutionPenalty
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.solutionShown = true;
        this.displayedText = this.level.solution;
        // TODO: Call REST to inform about solution taken
      }
    })
  }

  /**
   * Checks whether the flag is correct. If true, the level is unlocked and the user can continue to the next one,
   * otherwise popup dialog informing the user about penalty for submitting incorrect flag is displayed and the information
   * is send to the endpoint
   */
  submitFlag() {
    if (this.flag === this.level.flag) {
      this.activeLevelService.unlockCurrentLevel();
      this.correctFlag = true;
      this.nextLevel.emit(this.level.order + 1);
    } else {
      const dialogRef = this.dialog.open(UserActionDialogComponent, {
        data: {
          dataType: 'flag',
          dialogType: 'failure',
          penalty: this.level.incorrectFlagPenalty
        }
      });
      // TODO: Call REST to inform about incorrect flag
    }
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
        }
        )
    );
  }
}
