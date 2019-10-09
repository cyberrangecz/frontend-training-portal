/**
 * Class representing sandbox definition in a system
 */
import {User} from 'kypo2-auth';
import {TrainingDefinition} from '../../training/training-definition';

export class SandboxDefinition {
  id: number;
  title: string;
  url: string;
  rev: string;
  asocciatedTrainingDefs: TrainingDefinition[];
  authors: User[];

  constructor() {
  }

  toString() {
    return this.title;
  }
}
