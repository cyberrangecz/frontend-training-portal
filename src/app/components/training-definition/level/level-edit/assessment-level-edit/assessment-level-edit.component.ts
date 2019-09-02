import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AssessmentLevel} from '../../../../../model/level/assessment-level';
import {AlertTypeEnum} from '../../../../../model/enums/alert-type.enum';
import {AlertService} from '../../../../../services/shared/alert.service';
import {QuestionsOverviewComponent} from './question-edit/questions-overview/questions-overview.component';
import {AssessmentTypeEnum} from '../../../../../model/enums/assessment-type.enum';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {TrainingDefinitionFacade} from '../../../../../services/facades/training-definition-facade.service';
import {LevelEditService} from '../../../../../services/training-definition/level-edit.service';
import {BaseComponent} from '../../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { AssessmentLevelConfigurationFormGroup } from './assessment-level-configuration-form-group';

@Component({
  selector: 'kypo2-assessment-level-configuration',
  templateUrl: './assessment-level-edit.component.html',
  styleUrls: ['./assessment-level-edit.component.css']
})
/**
 * Component for editing new or existing assessment levels
 */
export class AssessmentLevelEditComponent extends BaseComponent implements OnInit {

  @ViewChild(QuestionsOverviewComponent, { static: false }) childComponent: QuestionsOverviewComponent;

  @Input('level') level: AssessmentLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  assessmentFormGroup: AssessmentLevelConfigurationFormGroup;

  isLoading = false;

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private levelService: LevelEditService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
  }

  get title() {return this.assessmentFormGroup.formGroup.get('title'); }
  get instructions() {return this.assessmentFormGroup.formGroup.get('instructions'); }
  get isTest() {return this.assessmentFormGroup.formGroup.get('isTest'); }
  get estimatedDuration() {return this.assessmentFormGroup.formGroup.get('estimatedDuration'); }
  get questions() {return this.assessmentFormGroup.formGroup.get('questions'); }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.assessmentFormGroup) {
      this.assessmentFormGroup = new AssessmentLevelConfigurationFormGroup();
    }
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.assessmentFormGroup.formGroup.dirty && this.childComponent.canDeactivate();
  }

  /**
   * Validates input, sets values to the level object and calls REST API to save changes
   */
  saveChanges() {
    if (this.assessmentFormGroup.formGroup.valid && this.childComponent.validateInput()) {
      this.setInputValuesToLevel();
      this.childComponent.save();
      this.level.questions = this.childComponent.questions;
      this.isLoading = true;
      this.assessmentFormGroup.formGroup.disable();
      this.trainingDefinitionFacade.updateAssessmentLevel(this.trainingDefinitionId, this.level)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(resp => {
            this.isLoading = false;
            this.assessmentFormGroup.formGroup.enable();
            this.assessmentFormGroup.formGroup.markAsPristine();
            this.levelService.emitLevelUpdated(this.level);
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Assessment level was successfully saved');
          },
          err => {
            this.isLoading = false;
            this.assessmentFormGroup.formGroup.enable();
            this.errorHandler.displayInAlert(err, 'Saving assessment level "' + this.level.title + '"');
          });
    }
  }

   /**
   * Reacts on change in inputs. Sets dirty to true
   */
  contentChanged() {
    this.assessmentFormGroup.formGroup.markAsDirty();
  }

  setInstructionsValue(event) {
    this.instructions.setValue(event);
  }

  /**
   * Emits event saying that this level should be deleted
   */
  onDeleteLevel() {
    this.deleteLevel.emit(this.level.id);
  }

  /**
   * Sets user input values to the level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title.value;
    this.level.instructions = this.instructions.value;
    this.level.questions = this.questions.value;
    if (this.isTest.value) {
      this.level.assessmentType = AssessmentTypeEnum.Test;
    } else {
      this.level.assessmentType = AssessmentTypeEnum.Questionnaire;
    }
    this.level.estimatedDuration = this.estimatedDuration.value ? this.estimatedDuration.value : 60;
    this.estimatedDuration.setValue(this.level.estimatedDuration);
  }

  /**
   * Sets values to the inputs from passed level object (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title.setValue(this.level.title);
      this.questions.setValue(this.level.questions);
      this.instructions.setValue(this.level.instructions);
      this.isTest.setValue(this.level.assessmentType === AssessmentTypeEnum.Test);
      this.estimatedDuration.setValue(this.level.estimatedDuration);
    }
  }


}
