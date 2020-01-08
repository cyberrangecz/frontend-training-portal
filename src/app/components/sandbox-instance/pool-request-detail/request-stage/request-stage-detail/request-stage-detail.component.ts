import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {BaseComponent} from '../../../../base.component';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {StageDetail} from '../../../../../model/sandbox/pool/request/stage/stage-detail';

/**
 * Component with virtual scroll displaying output of request stage
 */
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

  /**
   * Scrolls to the end of virtual scroll
   */
  scrollToEnd() {
    this.viewPort.scrollToIndex(this.totalLength, 'auto');
  }

  /**
   * Scrolls to the start of virtual scroll
   */
  scrollToStart() {
    this.viewPort.scrollToIndex(0, 'auto');
  }
}
