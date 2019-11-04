import {TrainingRunStateEnum} from '../enums/training-run-state.enum';
import {TrainingRunTableRow} from './training-run-table-row';
import {TrainingRun} from '../training/training-run';
import {SandboxInstanceState} from '../enums/sandbox-instance-state';

export class TrainingRunTableAdapter extends TrainingRunTableRow {
  player: string;
  state: TrainingRunStateEnum;
  sandboxId: number;
  sandboxState: SandboxInstanceState;

  constructor(run: TrainingRun, deletionRequested: boolean) {
    super();
    this.trainingRun = run;
    this.deletionRequested = deletionRequested;
    this.player = this.trainingRun.player.name;
    this.state = this.trainingRun.state;
    this.sandboxId = this.trainingRun.sandboxInstanceId;
    this.sandboxState = this.trainingRun.sandboxInstanceState;
  }
}
