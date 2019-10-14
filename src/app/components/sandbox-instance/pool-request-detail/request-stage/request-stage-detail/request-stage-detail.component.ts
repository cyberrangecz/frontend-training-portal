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

@Component({
  selector: 'kypo2-request-stage-detail',
  templateUrl: './request-stage-detail.component.html',
  styleUrls: ['./request-stage-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStageDetailComponent extends BaseComponent implements OnInit {

  @Input() stage: OpenStackStage;
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
