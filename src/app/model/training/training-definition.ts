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


  constructor(id: number, sandboxDefinitionId: number, authors: number[], state: TrainingDefinitionStateEnum, levels: number[]) {
    this.id = id;
    this.sandboxDefinitionId = sandboxDefinitionId;
    this.authors = authors;
    this.state = state;
    this.levels = levels;
  }
}
