import {ITableDataModel} from './itable-data-model';
import {SandboxInstance} from '../sandbox/sandbox-instance';
import {Subscription} from "rxjs";

export class SandboxInstanceTableData implements ITableDataModel {
  sandboxInstance: SandboxInstance;
  allocationSubscription: Subscription;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
}
