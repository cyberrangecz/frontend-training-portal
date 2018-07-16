import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state-enum";

export class TrainingDefinition {

  id: number;
  sandboxDefinition: number;
  title: string;
  description: string;
  authors: number[];
  prerequisites: string;
  outcomes: string;
  state: TrainingDefinitionStateEnum;
  levels: number[];


  constructor(id: number, sandboxDefinition: number, authors: number[], state: TrainingDefinitionStateEnum, levels: number[]) {
    this.id = id;
    this.sandboxDefinition = sandboxDefinition;
    this.authors = authors;
    this.state = state;
    this.levels = levels;
  }
}
