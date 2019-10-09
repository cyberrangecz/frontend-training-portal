import { FormControl, FormGroup, Validators } from '@angular/forms';
import {GameLevel} from '../../../../../../model/level/game-level';

export class GameLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: GameLevel) {
    this.formGroup = new FormGroup({
      title: new FormControl(level.title, Validators.required),
      content: new FormControl(level.content, Validators.required),
      solution: new FormControl(level.solution, Validators.required),
      maxScore: new FormControl(level.maxScore, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(100)
      ]),
      solutionPenalized: new FormControl(level.solutionPenalized),
      incorrectFlagLimit: new FormControl(level.incorrectFlagLimit, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(100)
      ]),
      flag: new FormControl(level.flag, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      estimatedDuration: new FormControl(level.estimatedDuration, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(60)
      ]),
    });
  }

  setToLevel(level: GameLevel) {
    level.title = this.formGroup.get('title').value;
    level.content = this.formGroup.get('content').value;
    level.solution = this.formGroup.get('solution').value;
    level.maxScore = this.formGroup.get('maxScore').value;
    level.solutionPenalized = this.formGroup.get('solutionPenalized').value;
    level.incorrectFlagLimit = this.formGroup.get('incorrectFlagLimit').value;
    level.flag = this.formGroup.get('flag').value;
    level.estimatedDuration = this.formGroup.get('estimatedDuration').value;
    level.valid = this.formGroup.valid && level.hints.every(hint => hint.valid);
  }
}
