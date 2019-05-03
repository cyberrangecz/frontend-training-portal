import {TrainingInstance} from "../training/training-instance";
import {TableAdapter} from "./table-adapter";
import {Subscription} from "rxjs";

export class TrainingInstanceTableAdapter implements TableAdapter {
  trainingDefinitionTitle: string;
  isAllocationInProgress: boolean;
  isAllocationFailed: boolean;
  allocatedSandboxesCount: number;
  failedSandboxesCount: number;
  areSandboxDataLoaded: boolean;
  trainingInstance: TrainingInstance;
  allocationSubscription: Subscription;
}
