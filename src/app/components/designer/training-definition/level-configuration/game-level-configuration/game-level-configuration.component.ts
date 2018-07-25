import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {Hint} from "../../../../../model/level/hint";
import {HintStepperComponent} from "../hints/hint-stepper/hint-stepper.component";

@Component({
  selector: 'game-level-configuration',
  templateUrl: './game-level-configuration.component.html',
  styleUrls: ['./game-level-configuration.component.css']
})
export class GameLevelConfigurationComponent implements OnInit, OnChanges {

  @Input('level') level: GameLevel;

  @ViewChild(HintStepperComponent) childComponent: HintStepperComponent;


  title: string;
  content: string;
  solution: string;
  maxScore: number;
  solutionPenalty: number;
  incorrectFlagPenalty: number;
  flag: string;
  estimatedDuration: number;
  hints: Hint[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  saveChanges() {
    if (this.validateChanges()) {
      this.setInputValuesToLevel();
      this.childComponent.saveChanges();
      // TODO: call service and save level through rest
    }
  }

  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }
    if (!this.content || this.content.replace(/\s/g, '') === '') {
      errorMessage += 'Content cannot be empty\n'
    }
    if (!this.solution || this.solution.replace(/\s/g, '') === '') {
      errorMessage += 'Solution cannot be empty\n'
    }
    if (!this.flag || this.flag.replace(/\s/g, '') === '' || this.flag.length > 50) {
      errorMessage += 'Flag cannot be empty or larger than 50 characters\n'
    }
    if (!this.incorrectFlagPenalty || this.incorrectFlagPenalty < 0 || this.incorrectFlagPenalty > 1000) {
      errorMessage += 'Incorrect flag penalty must be a number in range from 0 to 1000\n'
    }
    if (!this.maxScore || this.maxScore < 0 || this.maxScore > 1000) {
      errorMessage += 'Maximal score must be a number in range from 0 to 1000\n'
    }
    if (!this.solutionPenalty || this.solutionPenalty < 0 || this.solutionPenalty > 1000) {
      errorMessage += 'Solution penalty must be a number in range from 0 to 1000\n'
    }

    if (!this.estimatedDuration || this.solutionPenalty < 0) {
      errorMessage += 'Estimated duration must be a positive number\n'
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
