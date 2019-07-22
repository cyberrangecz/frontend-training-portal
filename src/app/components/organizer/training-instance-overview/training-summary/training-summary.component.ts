import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'training-summary',
  templateUrl: './training-summary.component.html',
  styleUrls: ['./training-summary.component.css']
})
/**
 * Component for training summary. Wrapper for child components
 */
export class TrainingSummaryComponent extends BaseComponent implements OnInit {

  ngOnInit() {
  }

}
