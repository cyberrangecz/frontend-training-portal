import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css']
})
/**
 * Component of training timer displaying time passed from start of the training
 */
export class TrainingTimerComponent implements OnInit {

  @Input('startTime') startTime: Date;
  constructor() { }

  ngOnInit() {
  }

}
