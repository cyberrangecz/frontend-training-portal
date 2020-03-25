import {RequestStageType} from '../../../../enums/request-stage-type.enum';
import {CleanupRequestStage} from './cleanup-request-stage';

export class OpenStackCleanupStage extends CleanupRequestStage {

  allocationStage: string;

  constructor() {
    super(RequestStageType.OPENSTACK_CLEANUP);
  }
}
