import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';

/**
 * Class representing row of sandbox instance table
 */
export class SandboxInstanceTableRow {
  sandboxInstance: SandboxInstance;
  isInProgress: boolean;
  isCreated: boolean;
  isFailed: boolean;
  isDeleteFailed: boolean;
}
