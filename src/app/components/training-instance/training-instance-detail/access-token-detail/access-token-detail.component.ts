import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {KypoBaseComponent} from 'kypo-common';
import {map, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
@Component({
  selector: 'kypo2-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessTokenDetailComponent extends KypoBaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data.trainingInstance)
      );  }
}
