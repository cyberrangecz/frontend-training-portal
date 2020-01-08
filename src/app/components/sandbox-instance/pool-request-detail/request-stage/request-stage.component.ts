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
import {BaseComponent} from '../../../base.component';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {RequestStageType} from '../../../../model/enums/request-stage-type.enum';
import {OpenStackStage} from '../../../../model/sandbox/pool/request/stage/open-stack-stage';
import {AnsibleRunStage} from '../../../../model/sandbox/pool/request/stage/ansible-run-stage';
import {RequestStageState} from '../../../../model/enums/request-stage-state.enum';
import {StageDetail} from '../../../../model/sandbox/pool/request/stage/stage-detail';
import {StageDetailEvent} from '../../../../model/events/stage-detail-event';
import {StageDetailEventType} from '../../../../model/enums/stage-detail-event-type';

/**
 * Component of request stage basic info
 */
@Component({
  selector: 'kypo2-request-stage',
  templateUrl: './request-stage.component.html',
  styleUrls: ['./request-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() stage: RequestStage;
  @Input() stageDetail: StageDetail;
  @Input() isCleanup: boolean;
  @Output() forceCleanup: EventEmitter<RequestStage> = new EventEmitter();
  @Output() stageDetailEvent: EventEmitter<StageDetailEvent> = new EventEmitter();

  stageDetailIsLoading = false;
  stageType: RequestStageType;
  logoSrc: string;
  stageStates = RequestStageState;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stage' in changes) {
      this.resolveStageType();
    }
    if ('stageDetail' in changes) {
      this.stageDetailIsLoading = false;
    }
  }

  /**
   * Emits event to force cleanup stage
   */
  onForceCleanup() {
    this.forceCleanup.emit(this.stage);
  }

  /**
   * Changes internal state of the component and emits event to the parent component
   * @param opened true if stage detail was opened, false if closed
   */
  onStageDetailEvent(opened: boolean) {
    this.stageDetailIsLoading = opened;
    this.stageDetailEvent.emit(
        new StageDetailEvent(
            this.stage,
            opened ? StageDetailEventType.SUBSCRIBE : StageDetailEventType.UNSUBSCRIBE
        )
    );
  }

  private resolveStageType() {
    if (this.stage instanceof OpenStackStage) {
      this.stageType = RequestStageType.OPENSTACK;
      this.logoSrc = 'openstack-logo.png';
    } else if (this.stage instanceof AnsibleRunStage) {
      this.stageType = RequestStageType.ANSIBLE_RUN;
      this.logoSrc = 'ansible-logo.png';
    }
  }
}
