import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css']
})
export class TrainingTimerComponent implements OnInit {

  @Input('startTime') startTime: Date;
  constructor() { }

  ngOnInit() {
  }

}
