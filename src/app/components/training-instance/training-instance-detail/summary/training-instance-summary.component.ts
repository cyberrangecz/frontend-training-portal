import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {Observable, timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {RouteFactory} from '../../../../model/routes/route-factory';

@Component({
  selector: 'kypo2-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for training summary. Wrapper for child components
 */
export class TrainingInstanceSummaryComponent extends BaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;
  hasStarted$: Observable<boolean>;

  progressLink: string;
  resultsLink: string;

  private expanded: Set<number> = new Set();
  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        map(data => data.trainingInstance),
        tap(ti => {
          this.progressLink = `/${RouteFactory.toTrainingInstanceProgress(ti.id)}`;
          this.resultsLink = `/${RouteFactory.toTrainingInstanceResults(ti.id)}`;
        })
      );

    this.hasStarted$ = timer(0, 60000)
      .pipe(
        switchMap(_ => this.trainingInstance$),
        map(ti => ti.hasStarted())
      );
  }

  open(index: number) {
    this.expanded.add(index);
  }

  close(index: number) {
    this.expanded.delete(index);
  }

  isExpanded(index: number): boolean {
    return this.expanded.has(index);
  }
}
