import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../../base.component';
import {Observable} from 'rxjs';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {map, takeWhile, tap} from 'rxjs/operators';

/**
 * Component displaying training instance results visualizations
 */
@Component({
  selector: 'kypo2-training-instance-results',
  templateUrl: './training-instance-results.component.html',
  styleUrls: ['./training-instance-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceResultsComponent extends BaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;
  vizSize: { width: number, height: number };

  constructor(
    private activeRoute: ActivatedRoute) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data.trainingInstance),
        tap(_ => this.calculateVisualizationSize(window.innerWidth, window.innerHeight))
      );
  }

  private calculateVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width: width, height: height };
  }

}
