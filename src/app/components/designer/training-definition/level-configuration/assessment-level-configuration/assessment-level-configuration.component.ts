import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {QuestionStepperComponent} from "../questions/question-stepper/question-stepper.component";

@Component({
  selector: 'assessment-level-configuration',
  templateUrl: './assessment-level-configuration.component.html',
  styleUrls: ['./assessment-level-configuration.component.css']
})
export class AssessmentLevelConfigurationComponent implements OnInit {

  @ViewChild(QuestionStepperComponent) childComponent: QuestionStepperComponent;
  @Input('level') level: AssessmentLevel;

  title: string;
  instructions: string;
  maxScore: number;
  questions: string[];

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

    if (!this.maxScore || this.maxScore < 0 || this.maxScore > 1000) {
      errorMessage += 'Maximal score must be a number in range from 0 to 1000\n'
    }

    if (!this.questions) {
      errorMessage += 'Questions cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.instructions = this.instructions;
    this.level.maxScore = this.maxScore;
    this.level.questions = this.questions[0];
  }

  private setInitialValues() {
    this.title = this.level.title;
    this.maxScore = this.level.maxScore;
    this.questions = [this.level.questions];
    this.instructions = this.level.instructions;
  }


}
