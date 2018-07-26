import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'levelStepperLabel'})
export class LevelStepperLabelPipe implements PipeTransform {
  transform(index: number , length: number): string {
    return length <= 10 ? 'Level ' + index : index.toString();
  }
}
