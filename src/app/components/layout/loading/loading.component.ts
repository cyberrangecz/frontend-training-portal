import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent extends BaseComponent implements OnInit {

  @Input() isLoading: boolean;

  ngOnInit() {
  }

}
