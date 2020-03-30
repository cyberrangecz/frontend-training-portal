import {TrainingRunStateEnum} from '../../enums/training-run-state.enum';
import {TrainingRun} from '../../training/training-run';

/**
 * Class representing row of training run table
 */
export class TrainingRunRowAdapter {
  player: string;
  state: TrainingRunStateEnum;
  sandboxId: number;
  trainingRun: TrainingRun;

  constructor(run: TrainingRun) {
    this.trainingRun = run;
    this.player = this.trainingRun.player.name;
    this.state = this.trainingRun.state;
    this.sandboxId = this.trainingRun.sandboxInstanceId;
  }
}
