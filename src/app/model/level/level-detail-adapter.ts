import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';
import {AbstractLevel} from './abstract-level';

export class LevelDetailAdapter {
  id: number;
  title: string;
  icon: string;
  estimatedDuration: number;
  type: AbstractLevelTypeEnum;
  detailRoute: string;


  constructor(level: AbstractLevel, detailRoute: string) {
    this.id = level.id;
    this.title = level.title;
    this.type = level.type;
    this.icon = level.icon;
    this.estimatedDuration = level.estimatedDuration;
    this.detailRoute = detailRoute;
  }
}

