import {TrainingRun} from "../training/training-run";
import {TableRowAdapter} from "./table-row-adapter";

export class TrainingRunTableRow implements TableRowAdapter {
  trainingRun: TrainingRun;
  deletionRequested: boolean;
}
