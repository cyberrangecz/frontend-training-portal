import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AssessmentLevel} from "../../../../../../model/level/assessment-level";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {QuestionsOverviewComponent} from "../questions/questions-overview/questions-overview.component";
import {AbstractQuestion} from "../../../../../../model/questions/abstract-question";
import {AssessmentTypeEnum} from "../../../../../../enums/assessment-type.enum";
import {ErrorHandlerService} from "../../../../../../services/error-handler.service";
import {TrainingDefinitionFacade} from "../../../../../../services/facades/training-definition-facade.service";
import {LevelsDefinitionService} from "../../../../../../services/levels-definition.service";

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
  @Input('trainingDefinitionId') trainingDefinitionId: number;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  title: string;
  instructions: string;
  isTest: boolean;
  estimatedDuration: number;
  questions: AbstractQuestion[];

  dirty = false;
  isLoading = false;

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private levelService: LevelsDefinitionService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) { }

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
    if (this.validateInput() && this.childComponent.validateInput()) {
      this.setInputValuesToLevel();
      this.childComponent.save();
      this.level.questions = this.childComponent.questions;
      this.isLoading = true;
      this.trainingDefinitionFacade.updateAssessmentLevel(this.trainingDefinitionId, this.level)
        .subscribe(resp => {
            this.dirty = false;
            this.isLoading = false;
            this.levelService.emitLevelUpdated(this.level);
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Assessment level was successfully saved');
          },
          err => {
            this.isLoading = false;
            this.errorHandler.displayHttpError(err, 'Saving assessment level "' + this.level.title + '"');
          });
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
    this.deleteLevel.emit(this.level.id);
  }

  /**
   * Validates user input, displays error message if error is found
   * @returns {boolean} true if input passes the validation, false otherwise
   */
  private validateInput(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.estimatedDuration && this.estimatedDuration !== 0) {
      this.estimatedDuration = 60;
    } else if (this.estimatedDuration < 1 || this.estimatedDuration > 60) {
      errorMessage += 'Estimated duration must be a number in range from 1 to 60\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
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
    this.level.estimatedDuration = this.estimatedDuration;
  }

  /**
   * Sets values to the inputs from passed level object (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title = this.level.title;
      this.questions = this.level.questions;
      this.instructions = this.level.instructions;
      this.isTest = this.level.assessmentType === AssessmentTypeEnum.Test;
      this.estimatedDuration = this.level.estimatedDuration;
    }
  }


}
