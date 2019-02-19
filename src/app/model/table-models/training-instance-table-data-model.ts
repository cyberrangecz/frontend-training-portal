import {TrainingInstance} from "../training/training-instance";
import {ITableDataModel} from "./itable-data-model";

export class TrainingInstanceTableDataModel implements  ITableDataModel{
  trainingDefinitionTitle: string;
  trainingInstance: TrainingInstance;
}
