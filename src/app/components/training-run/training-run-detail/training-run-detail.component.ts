import {Component, OnInit} from '@angular/core';
import {StepItem} from 'kypo2-stepper';
import {takeWhile} from 'rxjs/operators';
import {Level} from '../../../model/level/level';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {BaseComponent} from '../../base.component';
import {TrainingRunStepper} from './training-run-stepper';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {LevelStepperAdapter} from '../../../model/stepper/level-stepper-adapter';

@Component({
  selector: 'kypo2-training-run-detail',
  templateUrl: './training-run-detail.component.html',
  styleUrls: ['./training-run-detail.component.css']
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class TrainingRunDetailComponent extends BaseComponent implements OnInit {

  user$: Observable<User>;
  levels: Level[];

  selectedStep: number;
  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLoading = false;

  items: StepItem[] = [];
  stepper: TrainingRunStepper;

  constructor(private activeTrainingRunService: RunningTrainingRunService,
              private auth: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.initData();
    this.user$ = this.auth.activeUser$;
    this.subscribeToActiveLevelChange();
    this.isTimerDisplayed = true;
  }

  private initData() {
    this.levels = this.activeTrainingRunService.getLevels();
    this.startTime = this.activeTrainingRunService.getStartTime();
    this.isStepperDisplayed = this.activeTrainingRunService.getIsStepperDisplayed();
    this.selectedStep = this.activeTrainingRunService.getActiveLevelPosition();
    const stepperAdapterLevels = this.levels.map(level => new LevelStepperAdapter(level));
    this.stepper = new TrainingRunStepper(stepperAdapterLevels, this.isLoading, this.selectedStep);
  }

  private updateStepperActiveLevel() {
    const prev = this.stepper.items[this.selectedStep - 1];
    if (prev) {
      prev.primaryIcon = 'done';
    }
    const current =  this.stepper.items[this.selectedStep];
    if (current) {
    current.isActive = true;
    }
  }

  private subscribeToActiveLevelChange() {
    this.activeTrainingRunService.activeLevel$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      activeLevel => {
        this.selectedStep = this.activeTrainingRunService.getActiveLevelPosition();
        this.updateStepperActiveLevel();
      }
    );
  }
}

