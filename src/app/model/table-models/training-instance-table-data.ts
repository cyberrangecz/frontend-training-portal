import {TrainingInstance} from "../training/training-instance";
import {ITableDataModel} from "./itable-data-model";
import {Observable, Subscription} from "rxjs";
import {TrainingInstanceSandboxAllocationState} from "../training/training-instance-sandbox-allocation-state";

export class TrainingInstanceTableData implements ITableDataModel {
  trainingDefinitionTitle: string;
  isAllocationInProgress: boolean;
  isAllocationFailed: boolean;
  allocatedSandboxesCount: number;
  failedSandboxesCount: number;
  areSandboxDataLoaded: boolean;
  trainingInstance: TrainingInstance;
  allocationSubscription: Subscription;
}
