 import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingInstanceFacade} from '../../../services/facades/training-instance-facade.service';
import {ActiveTrainingInstanceService} from '../../../services/training-instance/active-training-instance.service';
 import {BaseComponent} from '../../base.component';
 import {map, takeWhile, tap} from 'rxjs/operators';
 import {of} from 'rxjs';
 import {PROGRESS_PATH, RESULTS_PATH, SUMMARY_PATH} from './paths';
@Component({
  selector: 'kypo2-training-instance-detail',
  templateUrl: './training-instance-detail.component.html',
  styleUrls: ['./training-instance-detail.component.css']
})
/**
 * Main component of training instance detail. Tab with navigation to views on selected training instance
 */
export class TrainingInstanceDetailComponent extends BaseComponent implements OnInit {

  navLinks = [];

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
    this.navLinks = [
      {
        path: SUMMARY_PATH,
        icon: 'list_alt',
        label: 'Summary',
        disabled: false
      },
      {
        path: PROGRESS_PATH,
        icon: 'timeline',
        label: 'Progress',
        disabled: isDisabled
      },
      {
        path: RESULTS_PATH,
        icon: 'assessment',
        label: 'Results',
        disabled: isDisabled
      }
    ];
  }
}
