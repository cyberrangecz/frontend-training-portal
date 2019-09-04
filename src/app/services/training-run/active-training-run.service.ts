import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractLevel} from '../../model/level/abstract-level';
import {GameLevel} from '../../model/level/game-level';
import {AssessmentLevel} from '../../model/level/assessment-level';
import {InfoLevel} from '../../model/level/info-level';
import {map} from 'rxjs/operators';
import {TrainingRunFacade} from '../facades/training-run-facade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {TRAINING_RUN_RESULTS_PATH} from '../../components/training-run/training-run-overview/paths';
import {TRAINING_RUN_PATH} from '../../paths';
import {ReplaySubject} from 'rxjs';

/**
 * Main service for running training game. Holds levels and its state. Handles user general training run user actions and events
 */
@Injectable()
export class ActiveTrainingRunService {

  constructor(private trainingRunFacade: TrainingRunFacade,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  private activeLevels: AbstractLevel[];
  private activeLevel: GameLevel | AssessmentLevel | InfoLevel;
  private startTime: Date;
  private isStepperDisplayed: boolean;

  sandboxInstanceId: number;
  trainingRunId: number;

  private activeLevelSubject: ReplaySubject<AbstractLevel> = new ReplaySubject<AbstractLevel>(1);
  activeLevel$: Observable<AbstractLevel> = this.activeLevelSubject.asObservable();

  setUpFromTrainingRun(trainingRunInfo: AccessTrainingRunInfo) {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.startTime = trainingRunInfo.startTime;
    this.activeLevels = trainingRunInfo.levels;
    this.setActiveLevel(trainingRunInfo.currentLevel);
  }

  getLevels(): AbstractLevel[] {
    return this.activeLevels;
  }

  getActiveLevel(): AbstractLevel {
    return this.activeLevel;
  }

  getActiveLevelPosition(): number {
    return this.activeLevels.findIndex(level => level.id === this.activeLevel.id);
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getIsStepperDisplayed(): boolean {
    return this.isStepperDisplayed;
  }

  /**
   * Sends request to move to next level. If response is successful, the next level in order is set as active
   */
  nextLevel(): Observable<AbstractLevel> {
    return this.trainingRunFacade.nextLevel(this.trainingRunId)
      .pipe(map(resp => {
        this.setActiveLevel(resp);
        return resp;
      }));
  }

  hasNextLevel(): boolean {
    return this.activeLevel.id !== this.activeLevels[this.activeLevels.length - 1].id;
  }

  finish(): Observable<any> {
    return this.trainingRunFacade.finish(this.trainingRunId)
      .pipe(map(resp => {
        this.clear();
        this.router.navigate( ['/' + TRAINING_RUN_PATH, this.trainingRunId, TRAINING_RUN_RESULTS_PATH], { relativeTo: this.activeRoute});
      }));
  }

  clear() {
    this.activeLevel = null;
    this.activeLevels = [];
  }

  private setActiveLevel(level: GameLevel | InfoLevel | AssessmentLevel) {
    this.activeLevel = level;
    this.activeLevelSubject.next(this.activeLevel);
  }
}
