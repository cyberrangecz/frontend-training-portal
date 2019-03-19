import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../model/level/abstract-level";
import {GameLevel} from "../model/level/game-level";
import {AssessmentLevel} from "../model/level/assessment-level";
import {InfoLevel} from "../model/level/info-level";
import {map} from "rxjs/operators";
import {TrainingRunFacade} from "./facades/training-run-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessTrainingRunInfo} from "../model/training/access-training-run-info";

/**
 * Service maintaining levels of training and active level instance for sub component of trainee training run
 */
@Injectable()
export class ActiveTrainingRunService {

  constructor(private trainingRunFacade: TrainingRunFacade) {
  }

  private _activeLevels: AbstractLevel[];
  private _activeLevel: GameLevel | AssessmentLevel | InfoLevel;

  sandboxInstanceId: number;
  trainingRunId: number;

  private _onActiveLevelChangedSubject: Subject<AbstractLevel> = new Subject<AbstractLevel>();
  /**
   * Observable of active level changes
   * @type {Observable<AbstractLevel[]>}
   */
  onActiveLevelChanged: Observable<AbstractLevel> = this._onActiveLevelChangedSubject.asObservable();

  private _onLevelLockChangedSubject: Subject<boolean> = new Subject<boolean>();
  onLevelLockChanged: Observable<boolean> = this._onLevelLockChangedSubject.asObservable();

  currentLevelLocked: boolean = true;

  setUpFromAccessTrainingRunInfo(trainingRunInfo: AccessTrainingRunInfo) {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this.setActiveLevels(trainingRunInfo.levels);
    this.setActiveLevel(trainingRunInfo.currentLevel);
  }

  getActiveLevels(): AbstractLevel[] {
    return this._activeLevels;
  }

  getActiveLevel(): AbstractLevel {
    return this._activeLevel;
  }

  /**
   * Sets active levels
   * @param {AbstractLevel[]} levels array of levels to be set as active
   */
  setActiveLevels(levels: AbstractLevel[]) {
    this._activeLevels = levels;
  }

  /**
   * Sets currently active level
   * @param level
   */
  setActiveLevel(level: GameLevel | InfoLevel | AssessmentLevel) {
    this._activeLevel = level;
    this._onActiveLevelChangedSubject.next(this._activeLevel);
  }

  /**
   * Unlocks current level (when all actions in the current level are finished) and user can move to the next level
   */
  unlockCurrentLevel() {
    this.currentLevelLocked = false;
    this._onLevelLockChangedSubject.next(false);
  }

  /**
   * Locks current level
   */
  lockCurrentLevel() {
    this.currentLevelLocked = true;
    this._onLevelLockChangedSubject.next(true);
  }

  /**
   * Sets the next level in order as active
   */
  nextLevel(): Observable<AbstractLevel> {
    return this.trainingRunFacade.nextLevel(this.trainingRunId)
      .pipe(map(resp => {
        this.setActiveLevel(resp);
        //this.lockCurrentLevel(); // TODO check if problem with locked info level does not begin here
        return resp;
      }));
  }

  hasNextLevel(): boolean {
    return this._activeLevel.id !== this._activeLevels[this._activeLevels.length - 1].id;
  }

  finish() {
    return this.trainingRunFacade.finishTrainingRun(this.trainingRunId);
  }

  clear() {
    this._activeLevel = null;
    this._activeLevels = [];
  }

}
