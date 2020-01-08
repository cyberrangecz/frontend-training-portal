import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';

/**
 * Displays loading progress bar
 */
@Component({
  selector: 'kypo2-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent extends BaseComponent implements OnInit {

  @Input() isLoading: boolean;

  ngOnInit() {
  }

}
