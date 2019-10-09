import {User} from 'kypo2-auth';
import {SandboxInstanceState} from '../enums/sandbox-instance-state';
import {TrainingRunStateEnum} from '../enums/training-run-state.enum';
import {AbstractLevel} from '../level/abstract-level';

/**
 * Class representing training run of an instance
 */
export class TrainingRun {

  id: number;
  sandboxInstanceId: number;
  trainingInstanceId: number;
  trainingDefinitionId: number;
  player: User;
  startTime: Date;
  endTime: Date;
  currentLevel: AbstractLevel | number;
  eventLogReference: string;
  state: TrainingRunStateEnum;
  sandboxInstanceState: SandboxInstanceState;

  constructor() {
  }

  isRunning(): boolean {
    return this.state === TrainingRunStateEnum.RUNNING;
  }

  hasPlayer(): boolean {
    return this.player !== undefined && this.player !== null;
  }
}
