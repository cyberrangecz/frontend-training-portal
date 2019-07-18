/**
 * Class representing sandbox definition in a system
 */
import {TrainingDefinition} from "../training/training-definition";
import {User} from 'kypo2-auth';

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
