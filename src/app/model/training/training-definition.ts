import {TrainingDefinitionStateEnum} from "../enums/training-definition-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {User} from 'kypo2-auth';
import {BetaTestingGroup} from './beta-testing-group';

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  estimatedDuration: number;
  showStepperBar: boolean;
  title: string;
  description: string;
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  betaTestingGroup: BetaTestingGroup;
  authors: User[];
  levels: AbstractLevel[];

  lastEditTime: Date;

  constructor() {
  }

  toString() {
    return this.id;
  }
}
