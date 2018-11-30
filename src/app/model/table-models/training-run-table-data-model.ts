import {TrainingRun} from "../training/training-run";
import {ITableDataModel} from "./itable-data-model";

export class TrainingRunTableDataModel implements ITableDataModel {
  trainingRun: TrainingRun;
  isWaitingForRevertResponse: boolean;
}
