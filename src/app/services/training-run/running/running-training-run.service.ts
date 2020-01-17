import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs/operators';
import {
  TRAINING_RUN_RESULTS_PATH
} from '../../../components/training-run/training-run-overview/paths';
import {Level} from '../../../model/level/level';
import {AssessmentLevel} from '../../../model/level/assessment-level';
import {GameLevel} from '../../../model/level/game-level';
import {InfoLevel} from '../../../model/level/info-level';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {TRAINING_RUN_PATH} from '../../../paths';
import {TrainingRunApi} from '../../api/training-run-api.service';

/**
 * Main service for running training game. Holds levels and its state. Handles user general training run user actions and events.
 * Subscribe to activeLevel$ to receive latest data updates.
 */
@Injectable()
export class RunningTrainingRunService {

  constructor(private trainingRunFacade: TrainingRunApi,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  private activeLevels: Level[];
  private activeLevel: Level;
  private startTime: Date;
  private isStepperDisplayed: boolean;

  sandboxInstanceId: number;
  trainingRunId: number;

  private activeLevelSubject: ReplaySubject<Level> = new ReplaySubject<Level>(1);
  activeLevel$: Observable<Level> = this.activeLevelSubject.asObservable();

  /**
   * Initializes the service from training run access info
   * @param trainingRunInfo
   */
  setUpFromTrainingRun(trainingRunInfo: AccessTrainingRunInfo) {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.startTime = trainingRunInfo.startTime;
    this.activeLevels = trainingRunInfo.levels;
    this.setActiveLevel(trainingRunInfo.currentLevel);
  }

  /**
   * Tries to access and setup training run with access token
   * @param accessToken access token entered by trainee
   */
  access(accessToken: string): Observable<number> {
    return this.trainingRunFacade.access(accessToken)
      .pipe(
        tap(trainingRunInfo => this.setUpFromTrainingRun(trainingRunInfo)),
        map(trainingRunInfo => trainingRunInfo.trainingRunId)
      );
  }

  getLevels(): Level[] {
    return this.activeLevels;
  }

  getActiveLevel(): Level {
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
  nextLevel(): Observable<Level> {
    return this.trainingRunFacade.nextLevel(this.trainingRunId)
      .pipe(map(resp => {
        this.setActiveLevel(resp);
        return resp;
      }));
  }

  hasNextLevel(): boolean {
    return this.activeLevel.id !== this.activeLevels[this.activeLevels.length - 1].id;
  }

  /**
   * Sends request to finish TR. If successful, clears current TR and navigates to training run results.
   */
  finish(): Observable<any> {
    return this.trainingRunFacade.finish(this.trainingRunId)
      .pipe(map(resp => {
        this.clear();
        this.router.navigate( ['/' + TRAINING_RUN_PATH, this.trainingRunId, TRAINING_RUN_RESULTS_PATH], { relativeTo: this.activeRoute});
      }));
  }

  /**
   * Clears current TR related attributes
   */
  clear() {
    this.activeLevel = null;
    this.activeLevels = [];
  }

  private setActiveLevel(level: Level) {
    this.activeLevel = level;
    this.activeLevelSubject.next(this.activeLevel);
  }
}
