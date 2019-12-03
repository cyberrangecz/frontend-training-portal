import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {OpenStackStage} from '../../../../../model/sandbox/pool/request/stage/open-stack-stage';
import {BaseComponent} from '../../../../base.component';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {StageDetail} from '../../../../../model/sandbox/pool/request/stage/stage-detail';

@Component({
  selector: 'kypo2-request-stage-detail',
  templateUrl: './request-stage-detail.component.html',
  styleUrls: ['./request-stage-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageDetailComponent extends BaseComponent implements OnInit {

  @Input() stageDetail: StageDetail;
  @Input() totalLength: number;
  @ViewChild(CdkVirtualScrollViewport, {static: true}) viewPort: CdkVirtualScrollViewport;

  ngOnInit() {
  }

  scrollToEnd() {
    this.viewPort.scrollToIndex(this.totalLength, 'auto');
  }

  scrollToStart() {
    this.viewPort.scrollToIndex(0, 'auto');
  }
}
