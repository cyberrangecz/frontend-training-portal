import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {BaseComponent} from '../../../../base.component';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-assessments-view',
  templateUrl: './assessments-view.component.html',
  styleUrls: ['./assessments-view.component.css'],
})
/**
 * Wrapper for assessment levels visualization
 */
export class AssessmentsViewComponent extends BaseComponent implements OnInit {
  trainingDefinitionId: number;
  trainingInstanceId: number;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.subscribeForInstanceChanges();
    this.getIdsForVisualization();
  }

  private getIdsForVisualization() {
    const activeTrainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    if (activeTrainingInstance) {
      this.trainingInstanceId = activeTrainingInstance.id;
      this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
    }
  }

  private subscribeForInstanceChanges() {
    this.activeTrainingInstanceService.onActiveTrainingChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(newInstanceId => this.getIdsForVisualization());
  }
}
