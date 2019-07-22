import {TableAdapter} from './table-adapter';
import {SandboxInstance} from '../sandbox/sandbox-instance';
import {Subscription} from "rxjs";

export class SandboxInstanceTableAdapter implements TableAdapter {
  sandboxInstance: SandboxInstance;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
}
