import {TrainingDefinition} from "../training/training-definition";

export class SandboxDefinition {
  id: number;
  title: string;
  authorIds: number[];

  canBeRemoved: boolean;
  associatedTrainingDefs: TrainingDefinition[];

  constructor(title: string, authorIds: number[]) {
    this.title = title;
    this.authorIds = authorIds;
  }

  toString() {
    return this.title;
  }
}
