import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../model/level/abstract-level";
import {GameLevel} from "../model/level/game-level";
import {AssessmentLevel} from "../model/level/assessment-level";
import {InfoLevel} from "../model/level/info-level";
import {map} from "rxjs/operators";
import {TrainingRunFacade} from "./facades/training-run-facade.service";

/**
 * Service maintaining levels of training and active level instance for sub component of trainee training run
 */
@Injectable()
export class ActiveTrainingRunLevelsService {

  constructor(private trainingRunFacade: TrainingRunFacade) {
  }

  private _activeLevels: AbstractLevel[];
  private _activeLevel: GameLevel | AssessmentLevel | InfoLevel;

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
        this.currentLevelLocked = true;
        this.setActiveLevel(resp);
        this._onLevelLockChangedSubject.next(true);
        return resp;
      }));
  }

  clear() {
    this._activeLevel = null;
    this._activeLevels = [];
  }

}
