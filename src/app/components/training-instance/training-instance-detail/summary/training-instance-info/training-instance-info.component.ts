import {Component, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {BaseComponent} from '../../../../base.component';
import {takeWhile} from 'rxjs/operators';
import {ACCESS_TOKEN_ROUTE} from '../../../training-instance-overview/paths';

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
  ACCESS_TOKEN_ROUTE = ACCESS_TOKEN_ROUTE;

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
