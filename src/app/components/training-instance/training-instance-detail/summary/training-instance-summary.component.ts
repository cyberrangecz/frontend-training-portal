import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {RouteFactory} from '../../../../model/routes/route-factory';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {ActiveTrainingInstanceService} from '../../../../services/training-instance/active-training-instance.service';

@Component({
  selector: 'kypo2-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css']
})
/**
 * Component for training summary. Wrapper for child components
 */
export class TrainingInstanceSummaryComponent extends BaseComponent implements OnInit {

  trainingInstance: TrainingInstance;
  trainingDefinition: TrainingDefinition;
  accessTokenRouterLink: string;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.trainingInstance = this.activeTrainingInstanceService.get();
    if (this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
      this.accessTokenRouterLink = RouteFactory.toTrainingInstanceAccessToken(this.trainingInstance.id);
    }
  }


}
