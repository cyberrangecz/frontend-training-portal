import {RequestStageType} from '../../../../enums/request-stage-type.enum';
import {CleanupRequestStage} from './cleanup-request-stage';

export class AnsibleCleanupStage extends CleanupRequestStage {
  allocationStage: string;

  constructor() {
    super(RequestStageType.ANSIBLE_CLEANUP);
  }
}
