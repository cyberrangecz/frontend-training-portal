import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import { KypoValidators } from 'kypo-common';

/**
 * Form control class of training definition edit form
 */
export class TrainingDefinitionEditFormGroup {
  formGroup: FormGroup;

  constructor(trainingDefinition: TrainingDefinition) {
    this.formGroup = new FormGroup({
      title: new FormControl(trainingDefinition.title, KypoValidators.noWhitespace),
      description: new FormControl(trainingDefinition.description),
      prerequisites: new FormArray(trainingDefinition.prerequisites.map(prereq => new FormControl(prereq))),
      outcomes: new FormArray(trainingDefinition.outcomes.map(outcomes => new FormControl(outcomes))),
      showProgress: new FormControl(trainingDefinition.showStepperBar),
    });
  }

  /**
   * Sets values from form to training definition object
   * @param trainingDefinition training definition object to be filled with inputs from form
   */
  setValuesToTrainingDefinition(trainingDefinition: TrainingDefinition) {
    trainingDefinition.title = this.formGroup.get('title').value;
    trainingDefinition.description = this.formGroup.get('description').value;
    trainingDefinition.showStepperBar = this.formGroup.get('showProgress').value;
    trainingDefinition.outcomes = this.formGroup.get('outcomes').value;
    trainingDefinition.prerequisites = this.formGroup.get('prerequisites').value;
  }
}
