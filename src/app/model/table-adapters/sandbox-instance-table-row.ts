import {SandboxInstance} from '../sandbox/pool/sandbox-instance';
import {TableRowAdapter} from './table-row-adapter';

export class SandboxInstanceTableRow implements TableRowAdapter {
  sandboxInstance: SandboxInstance;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
  isDeleteFailed: boolean;
}
