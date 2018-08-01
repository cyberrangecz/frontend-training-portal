import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";

/**
 * Class representing training definition in a system.
 */
export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  title: string;
  description: string;
  authorIds: number[];
  prerequisites: string;
  outcomes: string;
  state: TrainingDefinitionStateEnum;
  levels: number[];
  showProgress: boolean;

  canBeArchived: boolean;


  constructor(sandboxDefinitionId: number, authorIds: number[], state: TrainingDefinitionStateEnum, levels: number[]) {
    this.sandboxDefinitionId = sandboxDefinitionId;
    this.authorIds = authorIds;
    this.state = state;
    this.levels = levels;
    this.canBeArchived = false;
  }

  toString() {
    return this.id;
  }
}
