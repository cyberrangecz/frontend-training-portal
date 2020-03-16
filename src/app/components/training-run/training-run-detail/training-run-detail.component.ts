import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {take, takeWhile, tap} from 'rxjs/operators';
import {Level} from '../../../model/level/level';
import {KypoBaseComponent} from 'kypo-common';
import {TrainingRunStepper} from './training-run-stepper';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {LevelStepperAdapter} from '../../../model/stepper/level-stepper-adapter';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';

@Component({
  selector: 'kypo2-training-run-detail',
  templateUrl: './training-run-detail.component.html',
  styleUrls: ['./training-run-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class TrainingRunDetailComponent extends KypoBaseComponent implements OnInit {

  user$: Observable<User>;
  activeLevel$: Observable<Level>;
  levels: Level[];
  stepper: TrainingRunStepper;

  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  sandboxId: number;

  constructor(private trainingRunService: RunningTrainingRunService,
              private auth: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.user$ = this.auth.activeUser$;
    this.levels = this.trainingRunService.getLevels();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.sandboxId = this.trainingRunService.sandboxInstanceId;
    if (this.isStepperDisplayed) {
      const stepperAdapterLevels = this.levels.map(level => new LevelStepperAdapter(level));
      this.stepper = new TrainingRunStepper(stepperAdapterLevels, this.trainingRunService.getActiveLevelPosition());
    }

    this.activeLevel$ = this.trainingRunService.activeLevel$
      .pipe(
        takeWhile(() => this.isAlive),
        tap( _ => {
          this.isLast = this.trainingRunService.isLast();
          if (this.isStepperDisplayed) {
            this.stepper.onActiveLevelUpdated(this.trainingRunService.getActiveLevelPosition());
          }
        })
      );
  }

  next() {
    this.trainingRunService.next()
      .pipe(
        take(1)
      ).subscribe();
  }
}

