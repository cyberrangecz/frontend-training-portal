import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../../base.component';
import {Observable} from 'rxjs';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {map, takeWhile, tap} from 'rxjs/operators';
import {DIVIDE_BY} from './traning-instance-results.constants';

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

  @HostListener('window:resize')
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
    const width = windowWidth / DIVIDE_BY;
    const height = windowHeight / DIVIDE_BY;
    this.vizSize = { width: width, height: height };
  }

}
