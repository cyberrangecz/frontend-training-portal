import {RequestStageType} from '../../../../enums/request-stage-type.enum';
import {AllocationRequestStage} from './allocation-request-stage';

/**
 * Class representing openstack stage
 */
export class OpenStackAllocationStage extends AllocationRequestStage {
  status: string;
  statusReason: string;

  constructor() {
    super(RequestStageType.OPENSTACK_ALLOCATION);
  }
}
