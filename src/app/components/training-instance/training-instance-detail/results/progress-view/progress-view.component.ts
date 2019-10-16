import { Component, OnInit } from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.css']
})
/**
 * Wrapper for progress visualization
 */
export class ProgressViewComponent extends BaseComponent implements OnInit {
  isLoading = true;
  trainingDefinitionId: number;
  trainingInstanceId: number;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.getIdsForVisualization();
  }

  private getIdsForVisualization() {
    const activeTrainingInstance = this.activeTrainingInstanceService.get();
    if (activeTrainingInstance) {
      this.trainingInstanceId = activeTrainingInstance.id;
      this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
      this.isLoading = false;
    }
  }
}
