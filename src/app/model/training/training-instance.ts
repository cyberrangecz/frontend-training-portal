/**
 * Class representing training instance of a definition.
 */
import {TrainingDefinition} from './training-definition';
import {User} from '../user/user';

export class TrainingInstance {

  id: number;
  poolId: number;
  trainingDefinition: TrainingDefinition;
  sandboxWithTrainingRunIds: number[];
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  organizers: User[];
  accessToken: string;
  constructor() {
  }

  hasPoolId(): boolean {
    return this.poolId !== undefined && this.poolId !== null;
  }

  hasTrainingRunConnectedWithSandbox(sandboxInstanceId: number): boolean {
    return this.sandboxWithTrainingRunIds.includes(sandboxInstanceId);
  }

  isActive(timestamp: number): boolean {
    return this.startTime.valueOf() < timestamp && this.endTime.valueOf() > timestamp
  }
}
