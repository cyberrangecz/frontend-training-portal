import { Component, OnInit } from '@angular/core';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css']
})
/**
 * Main component of the trainee overview. Wrapper for child components (table and training access)
 */
export class TrainingRunOverviewComponent extends BaseComponent implements OnInit {
  // TODO make it smart and children dumb

  constructor(private activeLevelsService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.activeLevelsService.clear();
  }

}
