import {Pipe, PipeTransform} from '@angular/core';
import {TrainingDefinition} from '../model/training/training-definition';

@Pipe({
  name: 'trainingDefinitionsTableFormat'
})
export class TrainingDefinitionsTableFormatPipe implements PipeTransform {

  transform(trainingDefinitions: TrainingDefinition[]): string {
  if (!trainingDefinitions || trainingDefinitions.length === 0) {
      return '-';
    }
    if (trainingDefinitions.length === 1) {
      return trainingDefinitions[0].title;
    }
    if (trainingDefinitions.length > 1) {
      return `${trainingDefinitions[0].title} and ${trainingDefinitions.length - 1} more...`;
    }
  }
}
