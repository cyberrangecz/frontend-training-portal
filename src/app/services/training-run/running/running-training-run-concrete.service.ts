import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {from} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {switchMap, tap} from 'rxjs/operators';
import {Level} from '../../../model/level/level';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RunningTrainingRunService} from './running-training-run.service';

/**
 * Main service for running training game. Holds levels and its state. Handles user general training run user actions and events.
 * Subscribe to activeLevel$ to receive latest data updates.
 */
@Injectable()
export class RunningTrainingRunConcreteService extends RunningTrainingRunService {

  constructor(private api: TrainingRunApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
    super();
  }

  private activeLevels: Level[] = [];
  private startTime: Date;
  private isStepperDisplayed: boolean;

  /**
   * Initializes the service from training run access info
   * @param trainingRunInfo
   */
  init(trainingRunInfo: AccessTrainingRunInfo) {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.startTime = trainingRunInfo.startTime;
    this.activeLevels = trainingRunInfo.levels;
    this.setActiveLevel(trainingRunInfo.currentLevel);
  }

  getLevels(): Level[] {
    return this.activeLevels;
  }

  getActiveLevel(): Level {
    return this.activeLevelSubject$.getValue();
  }

  getActiveLevelPosition(): number {
    return this.activeLevels.findIndex(level => level?.id === this.getActiveLevel()?.id);
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
  next(): Observable<any> {
    return this.isLast() ? this.callApiToFinish() : this.callApiToNextLevel();
  }

  isLast(): boolean {
    return this.getActiveLevel()?.id === this.activeLevels[this.activeLevels.length - 1]?.id;
  }

  /**
   * Clears current TR related attributes
   */
  clear() {
    this.trainingRunId = undefined;
    this.sandboxInstanceId = undefined;
    this.startTime = undefined;
    this.activeLevelSubject$.next(undefined);
    this.activeLevels = [];
  }

  private setActiveLevel(level: Level) {
    this.activeLevelSubject$.next(level);
  }

  private callApiToNextLevel(): Observable<Level> {
    return this.api.nextLevel(this.trainingRunId)
      .pipe(
        tap(level => this.setActiveLevel(level),
          err => this.errorHandler.emit(err, 'Moving to next level'))
      );
  }

  private callApiToFinish(): Observable<any> {
    return this.api.finish(this.trainingRunId)
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Finishing training')}),
        switchMap(_ => from(this.router.navigate( [RouteFactory.toTrainingRunResult(this.trainingRunId)]))),
        tap(_ => this.clear()),
      );
  }
}
