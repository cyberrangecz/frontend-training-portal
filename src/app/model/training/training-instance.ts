/**
 * Class representing training instance of a definition.
 */
import {TrainingDefinition} from './training-definition';

export class TrainingInstance {

  id: number;
  trainingDefinition: TrainingDefinition;
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  organizersIds: number[];
  accessToken: string;


  constructor() {
  }
}
