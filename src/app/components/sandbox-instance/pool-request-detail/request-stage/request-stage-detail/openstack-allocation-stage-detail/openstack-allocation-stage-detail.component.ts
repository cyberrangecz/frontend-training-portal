import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {KypoBaseComponent} from 'kypo-common';
import {OpenStackAllocationStage} from '../../../../../../model/sandbox/pool/request/stage/open-stack-allocation-stage';

@Component({
  selector: 'kypo2-openstack-allocation-stage-detail',
  templateUrl: './openstack-allocation-stage-detail.component.html',
  styleUrls: ['./openstack-allocation-stage-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenstackAllocationStageDetailComponent extends KypoBaseComponent implements OnInit {

  @Input() stageDetail: OpenStackAllocationStage;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
