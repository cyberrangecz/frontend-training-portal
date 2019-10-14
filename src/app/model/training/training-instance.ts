/**
 * Class representing training instance of a definition.
 */
import {User} from 'kypo2-auth';
import {DisplayableResource} from './displayable-resource';
import {TrainingDefinition} from './training-definition';

export class TrainingInstance implements DisplayableResource {

  id: number;
  poolId: number;
  trainingDefinition: TrainingDefinition;
  sandboxWithTrainingRunIds: number[];
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  accessToken: string;

  constructor() {
    const delay = 5;
    this.startTime = new Date();
    this.startTime.setMinutes(this.startTime.getMinutes() + delay);
  }

  hasPoolId(): boolean {
    return this.poolId !== undefined && this.poolId !== null;
  }

  hasTrainingRunConnectedWithSandbox(sandboxInstanceId: number): boolean {
    return this.sandboxWithTrainingRunIds.includes(sandboxInstanceId);
  }

  isActive(timestamp: number): boolean {
    return this.startTime.valueOf() < timestamp && this.endTime.valueOf() > timestamp;
  }
}
