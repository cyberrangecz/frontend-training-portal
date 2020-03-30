import {Component, Input, OnInit} from '@angular/core';
import {RequestStage} from 'kypo-sandbox-model';
import {RequestStageState} from 'kypo-sandbox-model';

@Component({
  selector: 'kypo2-request-stage-common',
  templateUrl: './request-stage-common.component.html',
  styleUrls: ['./request-stage-common.component.scss']
})
export class RequestStageCommonComponent implements OnInit {

  @Input() stage: RequestStage;
  stageStates = RequestStageState;

  constructor() { }

  ngOnInit(): void {
  }

}
