/**
 * Class representing sandbox definition in a system
 */
import {TrainingDefinition} from "../training/training-definition";
import {User} from "../user/user";

export class SandboxDefinition {
  id: number;
  title: string;
  asocciatedTrainingDefs: TrainingDefinition[];
  authors: User[];

  constructor() {
  }

  toString() {
    return this.title;
  }
}
