import {RequestStageDTO} from './request-stage-dto';

export class OpenstackAllocationStageDTO extends RequestStageDTO {
  status: string;
  status_reason: string;
}
