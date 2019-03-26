import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {User} from "../user/user";
import {BetaTestingGroup} from "../user/beta-testing-group";

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  title: string;
  description: string;
  authors: User[];
  betaTestingGroup: BetaTestingGroup;
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  levels: AbstractLevel[];
  showStepperBar: boolean;
  startingLevelId: number;

  canBeArchived: boolean;


  constructor() {
  }

  toString() {
    return this.id;
  }
}
