import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {User} from "../user/user";

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  title: string;
  description: string;
  authorIds: User[] | number[];
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  levels: AbstractLevel[] | number[];
  showProgress: boolean;
  startingLevel: AbstractLevel | number;

  canBeArchived: boolean;


  constructor() {
  }

  toString() {
    return this.id;
  }
}
