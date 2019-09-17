import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AssessmentLevel} from '../../../../../model/level/assessment-level';
import {AssessmentTypeEnum} from '../../../../../model/enums/assessment-type.enum';

export class AssessmentLevelEditFormGroup {

    formGroup: FormGroup;

    constructor(level: AssessmentLevel) {
        this.formGroup = new FormGroup({
          title: new FormControl(level.title, Validators.required),
          instructions: new FormControl(level.instructions),
          isTest: new FormControl(level.assessmentType === AssessmentTypeEnum.Test),
          estimatedDuration: new FormControl(level.estimatedDuration, [
            Validators.max(60),
            Validators.min(1)
          ]),
        });
    }

    setToLevel(level: AssessmentLevel) {
      level.title = this.formGroup.get('title').value;
      level.instructions = this.formGroup.get('instructions').value;
      level.assessmentType = this.formGroup.get('isTest').value ? AssessmentTypeEnum.Test : AssessmentTypeEnum.Questionnaire;
      level.estimatedDuration = this.formGroup.get('estimatedDuration').value;
      level.valid = this.formGroup.valid && level.questions.every(question => question.valid);
    }
}
