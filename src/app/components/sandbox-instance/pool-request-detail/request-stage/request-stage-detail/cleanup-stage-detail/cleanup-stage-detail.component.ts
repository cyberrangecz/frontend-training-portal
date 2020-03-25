import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {KypoBaseComponent} from 'kypo-common';
import {AnsibleCleanupStage} from '../../../../../../model/sandbox/pool/request/stage/ansible-cleanup-stage';
import {OpenStackCleanupStage} from '../../../../../../model/sandbox/pool/request/stage/open-stack-cleanup-stage';

@Component({
  selector: 'kypo2-cleanup-stage-detail',
  templateUrl: './cleanup-stage-detail.component.html',
  styleUrls: ['./cleanup-stage-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CleanupStageDetailComponent extends KypoBaseComponent implements OnInit {

  @Input() stageDetail: AnsibleCleanupStage | OpenStackCleanupStage;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
