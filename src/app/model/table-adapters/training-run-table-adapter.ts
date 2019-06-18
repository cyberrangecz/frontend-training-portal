import {TrainingRun} from "../training/training-run";
import {TableAdapter} from "./table-adapter";

export class TrainingRunTableAdapter implements TableAdapter {
  trainingRun: TrainingRun;
  deletionRequested: boolean;
}
