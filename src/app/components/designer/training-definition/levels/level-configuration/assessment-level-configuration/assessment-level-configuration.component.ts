import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AssessmentLevel} from "../../../../../../model/level/assessment-level";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {QuestionsOverviewComponent} from "../questions/questions-overview/questions-overview.component";
import {AbstractQuestion} from "../../../../../../model/questions/abstract-question";
import {AssessmentTypeEnum} from "../../../../../../enums/assessment-type.enum";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'assessment-level-configuration',
  templateUrl: './assessment-level-configuration.component.html',
  styleUrls: ['./assessment-level-configuration.component.css']
})
/**
 * Component for configuration of new or existing assessment levels
 */
export class AssessmentLevelConfigurationComponent implements OnInit {

  @ViewChild(QuestionsOverviewComponent) childComponent: QuestionsOverviewComponent;
  @Input('level') level: AssessmentLevel;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  title: string;
  instructions: string;
  isTest: boolean;
  questions: AbstractQuestion[];

  dirty = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty && this.childComponent.canDeactivate();
  }

  /**
   * Validates input, sets values to the level object and calls REST API to save changes
   */
  saveChanges() {
    if (this.validateChanges()) {
      this.setInputValuesToLevel();
      this.childComponent.saveChanges();
      this.dirty = false;
      // TODO: call service and save level through rest
    }
  }

  /**
   * Reacts on change in inputs. Sets dirty to true
   */
  contentChanged() {
    this.dirty = true;
  }

  /**
   * Emits event saying that this level should be deleted
   */
  onDeleteLevel() {
    this.deleteLevel.emit(this.level.order - 1); // -1 because levels are ordered 1,2,3,4...
  }

  /**
   * Validates user input, displays error message if error is found
   * @returns {boolean} true if input passes the validation, false otherwise
   */
  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.questions) {
      errorMessage += 'Questions cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage, environment.defaultAlertDuration);
      return false;
    }
    return true;
  }

  /**
   * Sets user input values to the level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.instructions = this.instructions;
    this.level.questions = this.questions;
    if (this.isTest) {
      this.level.assessmentType = AssessmentTypeEnum.Test
    } else {
      this.level.assessmentType = AssessmentTypeEnum.Questionnaire;
    }
  }

  /**
   * Sets values to the inputs from passed level object (edit mode)
   */
  private setInitialValues() {
    this.title = this.level.title;
    this.questions = this.level.questions;
    this.instructions = this.level.instructions;
    this.isTest = this.level.assessmentType === AssessmentTypeEnum.Test;
  }


}
