import {KypoFilter} from 'kypo-common';

export class TrainingInstanceFilter extends KypoFilter {

  constructor(value: string) {
    super('title', value);
  }
}
