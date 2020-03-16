import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {map, takeWhile} from 'rxjs/operators';
import {KypoBaseComponent} from 'kypo-common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingInstance} from '../../../../model/training/training-instance';

/**
 * Component displaying progress visualization
 */
@Component({
  selector: 'kypo2-training-instance-progress',
  templateUrl: './training-instance-progress.component.html',
  styleUrls: ['./training-instance-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceProgressComponent extends KypoBaseComponent implements OnInit {

  @Input() trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data.trainingInstance)
      );
  }
}
