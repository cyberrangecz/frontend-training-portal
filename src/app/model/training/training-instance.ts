/**
 * Class representing training instance of a definition.
 */
import {TrainingDefinition} from './training-definition';
import {User} from '../user/user';

export class TrainingInstance {

  id: number;
  trainingDefinition: TrainingDefinition;
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  organizers: User[];
  accessToken: string;


  constructor() {
  }
}
