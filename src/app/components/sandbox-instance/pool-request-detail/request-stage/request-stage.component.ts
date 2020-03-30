import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {KypoBaseComponent, KypoRequestedPagination} from 'kypo-common';
import {RequestStage} from 'kypo-sandbox-model';
import {OpenStackAllocationStage} from 'kypo-sandbox-model';
import {AnsibleAllocationStage} from 'kypo-sandbox-model';
import {StageDetailEvent} from '../../../../model/events/stage-detail-event';
import {StageDetailEventType} from '../../../../model/enums/stage-detail-event-type';
import {OpenStackCleanupStage} from 'kypo-sandbox-model';
import {AnsibleCleanupStage} from 'kypo-sandbox-model';
import {ANSIBLE_LOGO_SRC, OPENSTACK_LOGO_SRC} from '../../../../model/sandbox/stage-logos';
import {StageDetail} from '../../../../model/sandbox/stage-detail-adapter';
import {CleanupRequestStage} from 'kypo-sandbox-model';

/**
 * Component of request stage basic info
 */
@Component({
  selector: 'kypo2-request-stage',
  templateUrl: './request-stage.component.html',
  styleUrls: ['./request-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() stage: RequestStage;
  @Input() stageDetail: StageDetail;
  @Output() stageDetailEvent: EventEmitter<StageDetailEvent> = new EventEmitter();

  @Output() fetchAnsibleOutput: EventEmitter<StageDetail> = new EventEmitter();

  stageDetailIsLoading = false;
  logoSrc: string;
  detailDisabled: boolean;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stage' in changes) {
      this.resolveStageLogo();
      this.resolveDetailDisabled();
    }
    if ('stageDetail' in changes) {
      this.stageDetailIsLoading = false;
    }
  }

  /**
   * Changes internal state of the component and emits event to the parent component
   * @param open true if stage detail was opened, false if closed
   */
  onStageDetailEvent(open: boolean) {
    this.stageDetailIsLoading = open;
    this.stageDetailEvent.emit(
        new StageDetailEvent(
            this.stage,
          open ? StageDetailEventType.OPEN : StageDetailEventType.CLOSE
        )
    );
  }

  onFetchAnsibleOutput(requestedPagination: KypoRequestedPagination) {
    this.stageDetail.requestedPagination = requestedPagination;
    this.fetchAnsibleOutput.emit(this.stageDetail);
  }

  private resolveStageLogo() {
    if (this.stage instanceof OpenStackAllocationStage || this.stage instanceof OpenStackCleanupStage) {
      this.logoSrc = OPENSTACK_LOGO_SRC;
    } else if (this.stage instanceof AnsibleAllocationStage || this.stage instanceof AnsibleCleanupStage) {
      this.logoSrc = ANSIBLE_LOGO_SRC;
    }
  }

  private resolveDetailDisabled() {
    if (this.stage.isInQueue()) {
      this.detailDisabled = true;
      return;
    }
    if (this.stage instanceof CleanupRequestStage && this.stage.hasFinished()) {
      this.detailDisabled = true;
    }
  }
}
