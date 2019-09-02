import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css']
})
/**
 * Component for training summary. Wrapper for child components
 */
export class TrainingInstanceSummaryComponent extends BaseComponent implements OnInit {

  ngOnInit() {
  }

}
