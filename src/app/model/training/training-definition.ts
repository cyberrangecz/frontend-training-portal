import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";

export class TrainingDefinition {

  id: number;
  sandboxDefinitionId: number;
  title: string;
  description: string;
  authors: number[];
  prerequisites: string;
  outcomes: string;
  state: TrainingDefinitionStateEnum;
  levels: number[];

  canBeArchived: boolean;


  constructor(sandboxDefinitionId: number, authors: number[], state: TrainingDefinitionStateEnum, levels: number[]) {
    this.sandboxDefinitionId = sandboxDefinitionId;
    this.authors = authors;
    this.state = state;
    this.levels = levels;
    this.canBeArchived = false;
  }
}
