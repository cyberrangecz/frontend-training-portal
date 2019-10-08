import {TableRowAdapter} from './table-row-adapter';
import {SandboxInstance} from '../sandbox/pool/sandbox-instance';

export class SandboxInstanceTableRow implements TableRowAdapter {
  sandboxInstance: SandboxInstance;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
  isDeleteFailed: boolean;
}
