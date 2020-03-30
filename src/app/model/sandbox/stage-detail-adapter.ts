import {RequestStage} from 'kypo-sandbox-model';
import {KypoRequestedPagination} from 'kypo-common';

export class StageDetail {
  stage: RequestStage;
  hasError: boolean;
  requestedPagination: KypoRequestedPagination;

  constructor(stage: RequestStage, hasError = false) {
    this.stage = stage;
    this.hasError = hasError;
  }
}
