import { FormControl, FormGroup, Validators } from '@angular/forms';
import {GameLevel} from '../../../../../../model/level/game-level';
import {INCORRECT_FLAG_LIMIT, MAX_ESTIMATED_DURATION, MAX_FLAG, MAX_SCORE} from './game-level-edit.contants';

/**
 * Form control class for game level edit component
 */
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
        Validators.max(MAX_SCORE)
      ]),
      solutionPenalized: new FormControl(level.solutionPenalized),
      incorrectFlagLimit: new FormControl(level.incorrectFlagLimit, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(INCORRECT_FLAG_LIMIT)
      ]),
      flag: new FormControl(level.flag, [
        Validators.required,
        Validators.maxLength(MAX_FLAG)
      ]),
      estimatedDuration: new FormControl(level.estimatedDuration, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(MAX_ESTIMATED_DURATION)
      ]),
    });
  }

  /**
   * Sets inserted form values from inputs to game level
   * @param level level which values should be filled
   */
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
