import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css']
})
/**
 * Component of training timer displaying time passed from start of the training
 */
export class TrainingTimerComponent extends BaseComponent implements OnInit {

  @Input('startTime') startTime: Date;
  ngOnInit() {
  }

}
