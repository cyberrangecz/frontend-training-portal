import {TrainingInstance} from "../training/training-instance";
import {TableAdapter} from "./table-adapter";
import {Observable, Subscription} from 'rxjs';
import {SandboxInstanceAllocationState} from '../training/sandbox-instance-allocation-state';

export class TrainingInstanceTableAdapter implements TableAdapter {
  trainingDefinitionTitle: string;
  isAllocationInProgress: boolean;
  isAllocationFailed: boolean;
  allocatedSandboxesCount: number;
  failedSandboxesCount: number;
  areSandboxDataLoaded: boolean;
  trainingInstance: TrainingInstance;
  allocation$: Observable<SandboxInstanceAllocationState>
}
