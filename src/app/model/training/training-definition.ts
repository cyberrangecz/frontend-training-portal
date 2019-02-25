import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {User} from "../user/user";
import {ViewGroup} from "../user/view-group";

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  title: string;
  description: string;
  authors: User[];
  viewGroup: ViewGroup;
  prerequisites: string[];
  outcomes: string[];
  state: TrainingDefinitionStateEnum;
  levels: AbstractLevel[];
  showProgress: boolean;
  startingLevel: AbstractLevel | number;

  canBeArchived: boolean;


  constructor() {
  }

  toString() {
    return this.id;
  }
}
