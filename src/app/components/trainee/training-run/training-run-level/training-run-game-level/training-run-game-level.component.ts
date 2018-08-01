import {Component, Input, OnInit} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {Hint} from "../../../../../model/level/hint";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";
import {MatDialog} from "@angular/material";
import {UserActionDialogComponent} from "./user-action-dialog/user-action-dialog.component";

@Component({
  selector: 'training-run-game-level',
  templateUrl: './training-run-game-level.component.html',
  styleUrls: ['./training-run-game-level.component.css']
})
export class TrainingRunGameLevelComponent implements OnInit {

  @Input('level') level: GameLevel;

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

  showHint(hintButton, index: number) {
    const dialogRef = this.dialog.open(UserActionDialogComponent, {
      data: {
        dataType: 'hint',
        dialogType: 'warning',
        penalty: hintButton.hint.hintPenalty
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.displayedText += '\n\n## <span style="color:slateblue">HINT ' + index + ":</span>\n" + hintButton.hint.content;
        hintButton.displayed = true;
        // TODO: Call REST to inform about hint taken
      }
    })
  }

  showSolution() {
    const dialogRef = this.dialog.open(UserActionDialogComponent, {
      data: {
        dataType: 'solution',
        dialogType: 'warning',
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

  submitFlag() {
    if (this.flag === this.level.flag) {
      this.activeLevelService.unlockCurrentLevel();
      this.correctFlag = true;
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
