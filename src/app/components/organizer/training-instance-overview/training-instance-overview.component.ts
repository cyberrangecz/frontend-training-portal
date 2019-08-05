 import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrainingInstanceFacade} from "../../../services/facades/training-instance-facade.service";
import {ActiveTrainingInstanceService} from "../../../services/organizer/active-training-instance.service";
 import {BaseComponent} from "../../base.component";
 import {map, takeWhile, tap} from "rxjs/operators";
 import {of} from "rxjs";
@Component({
  selector: 'training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css']
})
/**
 * Main component of training instance overview. Tab with navigation to child components
 */
export class TrainingInstanceOverviewComponent extends BaseComponent implements OnInit {

  navLinks = [];
  nestedNavLinks = [];

  constructor(private route: ActivatedRoute,
              private activeTrainingService: ActiveTrainingInstanceService,
              private trainingInstanceFacade: TrainingInstanceFacade) {
    super();
  }

  ngOnInit() {
    this.setActiveTrainingInstanceFromUrl();
  }

  /**
   * Gets id of training instance from url and sets it as active for child components
   */
  private setActiveTrainingInstanceFromUrl() {
    const snapshot = this.route.snapshot;
    const id = +snapshot.paramMap.get('id');
    if (!isNaN(id)) {
      this.trainingInstanceFacade.getTrainingInstanceById(id)
        .pipe(
          takeWhile(() => this.isAlive),
          tap(training => this.activeTrainingService.setActiveTrainingInstance(training))
        )
        .subscribe(training => this.createTabs());
    }
  }

  private createTabs() {
    const hasStarted = this.activeTrainingService.hasStarted();
    let isDisabled;
    if (hasStarted) {
      isDisabled = this.trainingInstanceFacade.hasTrainingRuns(this.activeTrainingService.getActiveTrainingInstance().id).pipe(map(res => !res));
    } else {
      isDisabled = of(true);
    }
    this.nestedNavLinks = [
      {
        path: 'results',
        secondaryPath: 'visualization',
        icon: 'assessment',
        label: 'Results',
        disabled: isDisabled
      }
    ];

    this.navLinks = [
      {
        path: 'summary',
        icon: 'list_alt',
        label: 'Summary',
        disabled: false
      },
      {
        path: 'progress',
        icon: 'timeline',
        label: 'Progress',
        disabled: isDisabled
      }
    ]
  }
}
