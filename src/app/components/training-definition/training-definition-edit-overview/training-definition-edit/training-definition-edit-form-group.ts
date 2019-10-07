import {FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {TrainingDefinition} from '../../../../model/training/training-definition';

export class TrainingDefinitionEditFormGroup {
  formGroup: FormGroup;

  constructor(trainingDefinition: TrainingDefinition) {
    this.formGroup = new FormGroup({
      title: new FormControl(trainingDefinition.title, Validators.required),
      description: new FormControl(trainingDefinition.description),
      prerequisites: new FormArray(trainingDefinition.prerequisites.map(prereq => new FormControl(prereq))),
      outcomes: new FormArray(trainingDefinition.outcomes.map(outcomes => new FormControl(outcomes))),
      sandboxDefId: new FormControl(trainingDefinition.sandboxDefinitionId, Validators.required),
      showProgress: new FormControl(trainingDefinition.showStepperBar),
    });
  }

  setValuesToTrainingDefinition(td: TrainingDefinition) {
    td.sandboxDefinitionId = this.formGroup.get('sandboxDefId').value;
    td.title = this.formGroup.get('title').value;
    td.description = this.formGroup.get('description').value;
    td.showStepperBar = this.formGroup.get('showProgress').value;
    td.outcomes = this.formGroup.get('outcomes').value;
    td.prerequisites = this.formGroup.get('prerequisites').value;
  }
}
