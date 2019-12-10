 import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
 import {Observable, of} from 'rxjs';
 import {map, takeWhile} from 'rxjs/operators';
import {TrainingInstanceFacade} from '../../../services/facades/training-instance-facade.service';
import {ActiveTrainingInstanceService} from '../../../services/training-instance/active-training-instance.service';
 import {BaseComponent} from '../../base.component';
 import {PROGRESS_PATH, RESULTS_PATH, SUMMARY_PATH} from './paths';
 import {TrainingInstance} from '../../../model/training/training-instance';
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
  trainingInstance$: Observable<TrainingInstance>;

  constructor(private route: ActivatedRoute,
              private trainingInstanceFacade: TrainingInstanceFacade,
              private activeTrainingService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.route.data.pipe(
      map(data => data.trainingInstance),
      takeWhile(() => this.isAlive),
    );
    this.trainingInstance$.subscribe(training => this.createTabs());
  }

  private createTabs() {
    const hasStarted = this.activeTrainingService.hasStarted();
    let isDisabled;
    if (hasStarted) {
      isDisabled = this.trainingInstanceFacade.hasTrainingRuns(this.activeTrainingService.get().id).pipe(map(res => !res));
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
