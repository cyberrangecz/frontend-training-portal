import {Component, Input, OnInit} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {Hint} from "../../../../../model/level/hint";

@Component({
  selector: 'game-level-configuration',
  templateUrl: './game-level-configuration.component.html',
  styleUrls: ['./game-level-configuration.component.css']
})
export class GameLevelConfigurationComponent implements OnInit {

  @Input('level') level: GameLevel;

  title: string;
  content: Blob;
  solution: Blob;
  maxScore: number;
  solutionPenalty: number;
  incorrectFlagPenalty: number;
  flag: string;
  estimatedDuration: number;
  hints: Hint[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.setInitialValues();
  }

  saveChanges() {
    if (this.validateChanges()) {
      this.setInputValuesToLevel();
      // TODO: call service and save level through rest
    }
  }

  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.content = this.content;
    this.level.solution  = this.solution;
    this.level.maxScore = this.maxScore;
    this.level.flag = this.flag;
    this.level.solutionPenalty = this.solutionPenalty;
    this.level.incorrectFlagPenalty = this.incorrectFlagPenalty;
    this.level.estimatedDuration = this.estimatedDuration;
    this.level.hints = this.hints;
  }

  private setInitialValues() {
    this.title = this.level.title;
    this.content = this.level.content;
    this.solution = this.level.solution;
    this.maxScore = 1000;
    this.flag = this.level.flag;
    this.solutionPenalty = this.maxScore - 1;
    this.incorrectFlagPenalty = this.level.incorrectFlagPenalty;
    this.estimatedDuration = this.level.estimatedDuration;
    this.hints = this.level.hints;
  }

}
