import {AbstractLevel} from '../level/abstract-level';

export class LevelMoveEvent {
  indexes: any;
  levels: AbstractLevel[];

  constructor(indexes: any, levels: AbstractLevel[]) {
    this.indexes = indexes;
    this.levels = levels;
  }
}
