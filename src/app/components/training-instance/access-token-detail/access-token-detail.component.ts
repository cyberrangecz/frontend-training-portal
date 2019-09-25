import { Component, OnInit } from '@angular/core';
import {TrainingInstance} from '../../../model/training/training-instance';
import {BaseComponent} from '../../base.component';
import {ActiveTrainingInstanceService} from '../../../services/training-instance/active-training-instance.service';

@Component({
  selector: 'kypo2-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css']
})
/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
export class AccessTokenDetailComponent extends BaseComponent implements OnInit {

  trainingInstance: TrainingInstance;

  constructor(private activeTrainingInstance: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.trainingInstance = this.activeTrainingInstance.get();
  }
}
