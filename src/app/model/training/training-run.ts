import {User} from 'kypo2-auth';
import {TrainingRunStateEnum} from '../enums/training-run-state.enum';
import {Level} from '../level/level';

/**
 * Class representing training run
 */
export class TrainingRun {

  id: number;
  sandboxInstanceId: number;
  trainingInstanceId: number;
  trainingDefinitionId: number;
  player: User;
  startTime: Date;
  endTime: Date;
  currentLevel: Level | number;
  eventLogReference: string;
  state: TrainingRunStateEnum;

  isRunning(): boolean {
    return this.state === TrainingRunStateEnum.RUNNING;
  }

  hasPlayer(): boolean {
    return this.player !== undefined && this.player !== null;
  }
}
