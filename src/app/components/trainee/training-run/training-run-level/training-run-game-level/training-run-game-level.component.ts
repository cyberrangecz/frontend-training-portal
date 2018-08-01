import {Component, Input, OnInit} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {Hint} from "../../../../../model/level/hint";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";

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

  constructor(private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.displayedText = this.level.content;
    this.initHintButtons()
  }

  showHint(hint: Hint, index: number) {
    this.displayedText += '\n ** HINT ' + index + ": **\n" + hint.content;
  }

  showSolution() {
    this.solutionShown = true;
    this.displayedText = this.level.solution;
  }

  submitFlag() {
    if (this.flag === this.level.flag) {
      this.activeLevelService.unlockCurrentLevel();
      this.correctFlag = true;
    } else {

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
