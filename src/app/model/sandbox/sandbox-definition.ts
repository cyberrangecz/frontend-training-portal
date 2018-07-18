import {TrainingDefinition} from "../training/training-definition";

export class SandboxDefinition {
  id: number;
  title: string;
  authors: number[];

  canBeRemoved: boolean;
  associatedTrainingDefs: TrainingDefinition[];

  constructor(title: string, authors: number[]) {
    this.title = title;
    this.authors = authors;
  }
}
