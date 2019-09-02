import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceFacade} from '../../../services/facades/training-instance-facade.service';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css']
})
/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
export class AccessTokenDetailComponent extends BaseComponent implements OnInit {

  isLoading = true;
  trainingInstance: TrainingInstance;

  constructor(private activeRoute: ActivatedRoute,
              private trainingInstanceFacade: TrainingInstanceFacade) {
    super();
  }

  ngOnInit() {
    const instanceId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (instanceId) {
      this.trainingInstanceFacade.getTrainingInstanceById(instanceId)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(trainingInstance => {
          this.trainingInstance = trainingInstance;
          this.isLoading = false;
        });
    }
  }
}
