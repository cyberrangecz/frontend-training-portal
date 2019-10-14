import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css']
})
/**
 * PRESENTATIONAL
 * Component of training timer displaying time passed from start of the training
 */
export class TrainingTimerComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('startTime') startTime: Date;
  timeElapsed: Observable<number>;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('startTime' in changes) {
      this.startCounter();
    }
  }

  private startCounter() {
    const period = 1000;
    this.timeElapsed = timer(0, period)
      .pipe(
        takeWhile(() => this.isAlive),
        map(() => this.calculateElapsedTime())
      );
  }

  private calculateElapsedTime(): number {
    return Date.now() - this.startTime.valueOf();
  }
}
