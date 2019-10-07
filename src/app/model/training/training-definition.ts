import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';
import {AbstractLevel} from '../level/abstract-level';
import {DisplayableResource} from './displayable-resource';

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition implements DisplayableResource {

  id: number;
  sandboxDefinitionId: number;
  estimatedDuration: number;
  showStepperBar: boolean;
  title: string;
  description: string;
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  levels: AbstractLevel[];

  lastEditTime: Date;

  constructor() {
    this.showStepperBar = true;
    this.outcomes = [];
    this.prerequisites = [];
    this.levels = [];
  }

  hasLevels(): boolean {
    return this.levels.length > 0;
  }

  toString() {
    return this.id;
  }
}
