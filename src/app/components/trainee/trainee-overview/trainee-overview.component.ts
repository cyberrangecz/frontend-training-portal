import { Component, OnInit } from '@angular/core';
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'trainee-overview',
  templateUrl: './trainee-overview.component.html',
  styleUrls: ['./trainee-overview.component.css']
})
/**
 * Main component of the trainee overview. Wrapper for child components (table and training access)
 */
export class TraineeOverviewComponent extends BaseComponent implements OnInit {

  constructor(private activeLevelsService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.activeLevelsService.clear();
  }

}
