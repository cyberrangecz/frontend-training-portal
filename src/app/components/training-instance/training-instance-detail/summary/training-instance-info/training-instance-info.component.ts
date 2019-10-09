import {Component, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {RouteFactory} from '../../../../../model/routes/route-factory';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {BaseComponent} from '../../../../base.component';
import {ACCESS_TOKEN_PATH} from '../../../training-instance-overview/paths';

@Component({
  selector: 'kypo2-training-instance-info',
  templateUrl: './training-instance-info.component.html',
  styleUrls: ['./training-instance-info.component.css']
})
/**
 * Displays info about selected training instance.
 */
export class TrainingInstanceInfoComponent extends BaseComponent implements OnInit {

  trainingInstance: TrainingInstance;
  trainingDefinition: TrainingDefinition;
  accessTokenRouterLink: string;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.subscribeActiveTrainingChanges();
  }

  /**
   * Loads all required data from endpoints
   */
  private loadData() {
    this.trainingInstance = this.activeTrainingInstanceService.get();
    if (this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
      this.accessTokenRouterLink = RouteFactory.toTrainingInstanceAccessToken(this.trainingInstance.id);
    }
  }

  /**
   * Subscribes to changes of active training, reloads data if active training is changed
   */
  private subscribeActiveTrainingChanges() {
    this.activeTrainingInstanceService.onActiveTrainingChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(change => this.loadData());
  }

}
