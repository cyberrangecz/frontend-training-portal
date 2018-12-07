import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../model/level/abstract-level";
import {GameLevel} from "../model/level/game-level";
import {AssessmentLevel} from "../model/level/assessment-level";
import {InfoLevel} from "../model/level/info-level";

/**
 * Service maintaining levels of training and active level instance for sub component of trainee training run
 */
@Injectable()
export class ActiveTrainingRunLevelsService {

  private _activeLevels: AbstractLevel[];
  private _activeLevel: GameLevel | AssessmentLevel | InfoLevel;

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
  nextLevel() {
    const index = this._activeLevels.indexOf(this._activeLevel);
    if (index + 1 < this._activeLevels.length) {
      // TODO: Call REST API
      //this.setActiveLevel(index + 1);
      this.currentLevelLocked = true;
      this._onLevelLockChangedSubject.next(true);
    }
  }

  clear() {
    this._activeLevel = null;
    this._activeLevels = [];
  }

}
