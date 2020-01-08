import {Filter} from './filter';

export class TrainingInstanceFilter extends Filter {

  constructor(value: string) {
    super('title', value);
  }
}
