import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to create readable label for steps in level stepper.
 * For steppers with less than 10 levels returns string 'Level x' and for steppers with more than 10 levels
 * returns only 'x', where x is index of the level (its order).
 */
@Pipe({name: 'levelStepperLabel'})
export class LevelStepperLabelPipe implements PipeTransform {
  transform(index: number , length: number): string {
    return length <= 10 ? 'Level ' + index : index.toString();
  }
}
