import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';

export class SandboxInstanceTableRow {
  sandboxInstance: SandboxInstance;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
  isDeleteFailed: boolean;
}
