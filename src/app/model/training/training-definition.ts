import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';
import {Level} from '../level/level';
import {DisplayableResource} from './displayable-resource';
import {formatDate} from '@angular/common';

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition implements DisplayableResource {
  get lastEditTime(): Date {
    return this._lastEditTime;
  }

  set lastEditTime(value: Date) {
    this._lastEditTime = value;
    this.lastEditTimeFormatted = formatDate(value, 'd MMM yyyy H:mm', 'en-US');
  }

  id: number;
  sandboxDefinitionId: number;
  estimatedDuration: number;
  showStepperBar: boolean;
  title: string;
  description: string;
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  levels: Level[];

  lastEditTimeFormatted: string;
  private _lastEditTime: Date;

  constructor() {
    this.showStepperBar = true;
    this.outcomes = [];
    this.prerequisites = [];
    this.levels = [];
  }

  toString() {
    return this.id;
  }
}
