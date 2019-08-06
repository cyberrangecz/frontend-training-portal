import {TrainingInstance} from "../training/training-instance";
import {TableRowAdapter} from "./table-row-adapter";
import {Observable} from 'rxjs';
import {SandboxInstanceAllocationState} from '../training/sandbox-instance-allocation-state';

export class TrainingInstanceTableRow implements TableRowAdapter {
  trainingDefinitionTitle: string;
  isAllocationInProgress: boolean;
  isAllocationFailed: boolean;
  allocatedSandboxesCount: number;
  failedSandboxesCount: number;
  areSandboxDataLoaded: boolean;
  trainingInstance: TrainingInstance;
  allocation$: Observable<SandboxInstanceAllocationState>
}
