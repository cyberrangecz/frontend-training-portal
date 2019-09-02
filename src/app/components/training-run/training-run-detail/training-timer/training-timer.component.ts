import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {Observable, timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';

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
    this.timeElapsed = timer(0, 1000)
      .pipe(
        takeWhile(() => this.isAlive),
        map(() => this.calculateElapsedTime())
      );
  }

  private calculateElapsedTime(): number {
    return Date.now() - this.startTime.valueOf();
  }
}
