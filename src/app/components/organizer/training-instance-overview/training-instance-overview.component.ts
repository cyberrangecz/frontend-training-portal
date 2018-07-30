import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {ActiveTrainingInstanceService} from "../../../services/active-training-instance.service";
@Component({
  selector: 'training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css']
})
export class TrainingInstanceOverviewComponent implements OnInit {

  navLinks = [
    {
      path: 'summary',
      icon: 'list_alt',
      label: 'Summary'
    },
    {
      path: 'progress',
      icon: 'timeline',
      label: 'Progress'
    }
    ];

  nestedNavLinks = [
    {
      path: 'results',
      secondaryPath: 'visualization',
      icon: 'assessment',
      label: 'Results'
    }
    ];

  constructor(private route: ActivatedRoute,
              private activeTrainingService: ActiveTrainingInstanceService,
              private trainingInstanceGetter: TrainingInstanceGetterService) { }

  ngOnInit() {
    this.setActiveTrainingInstanceFromUrl()
  }

  private setActiveTrainingInstanceFromUrl() {
    const snapshot = this.route.snapshot;
    const id = +snapshot.paramMap.get('id');
    if (!isNaN(id)) {
      this.trainingInstanceGetter.getTrainingInstanceById(id)
        .subscribe(training => this.activeTrainingService.setActiveTrainingInstance(training)
        );
    } else {
      this.activeTrainingService.setActiveTrainingInstance(null);
    }
  }


}
