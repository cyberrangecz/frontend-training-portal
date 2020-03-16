import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {KypoBaseComponent} from 'kypo-common';

/**
 * Component of training timer displaying time passed from start of the training
 */
@Component({
  selector: 'kypo2-training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingTimerComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() startTime: Date;
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
