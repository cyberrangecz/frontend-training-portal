import {TrainingDefinition} from "../training/training-definition";

/**
 * Class representing sandbox definition in a system
 */
export class SandboxDefinition {
  id: number;
  title: string;
  authorIds: number[];

  constructor(title: string, authorIds: number[]) {
    this.title = title;
    this.authorIds = authorIds;
  }

  toString() {
    return this.title;
  }
}
