import {AbstractLevel} from '../level/abstract-level';

export class LevelSwapEvent {
  indexes: any;
  levels: AbstractLevel[];

  constructor(indexes: any, levels: AbstractLevel[]) {
    this.indexes = indexes;
    this.levels = levels;
  }
}
