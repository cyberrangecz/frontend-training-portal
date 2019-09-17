import {AbstractLevel} from './abstract-level';

/**
 * Class representing single level in a training of type Info
 */
export class InfoLevel extends AbstractLevel {
  content: string;
  constructor() {
    super();
    this.icon = 'info';
  }
}
