import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KypoBaseComponent, KypoRequestedPagination} from 'kypo-common';
import {RequestStage} from 'kypo-sandbox-model';
import {RequestStageType} from 'kypo-sandbox-model';

/**
 * Component inserting concrete component based on request stage type
 */
@Component({
  selector: 'kypo2-request-stage-detail',
  templateUrl: './request-stage-detail.component.html',
  styleUrls: ['./request-stage-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageDetailComponent extends KypoBaseComponent implements OnInit {

  @Input() stage: RequestStage;
  @Output() fetchAnsibleOutput: EventEmitter<KypoRequestedPagination> = new EventEmitter();

  stageTypes = RequestStageType;

  ngOnInit() {
  }

  onFetchAnsibleOutput(pagination: KypoRequestedPagination) {
    this.fetchAnsibleOutput.emit(pagination);
  }
}
