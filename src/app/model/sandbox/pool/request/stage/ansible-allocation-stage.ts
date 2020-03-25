import {RequestStageType} from '../../../../enums/request-stage-type.enum';
import {KypoPaginatedResource} from 'kypo-common';
import {AllocationRequestStage} from './allocation-request-stage';

/**
 * Class representing ansible stage
 */
export class AnsibleAllocationStage extends AllocationRequestStage {

  repoUrl: string;
  rev: string;
  output: KypoPaginatedResource<string>;

  constructor() {
    super(RequestStageType.ANSIBLE_ALLOCATION);
  }

  hasOutput(): boolean {
    return this.output && this.output.elements.length > 0;
  }
}
