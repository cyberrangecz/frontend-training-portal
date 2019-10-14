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

@Component({
  selector: 'kypo2-request-stage',
  templateUrl: './request-stage.component.html',
  styleUrls: ['./request-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() stage: RequestStage;
  @Input() isCleanup: boolean;
  @Output() forceCleanup: EventEmitter<RequestStage> = new EventEmitter();

  stageType: RequestStageType;
  logoSrc: string;

  stageStates = RequestStageState;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stage' in changes) {
      this.resolveStageType();
    }
  }

  onForceCleanup() {
    this.forceCleanup.emit(this.stage);
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
