import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../model/level/abstract-level";

/**
 * Service maintaining active levels instance for sub component of trainee training run
 */
@Injectable()
export class ActiveTrainingRunLevelsService {

  private _activeLevels: AbstractLevel[];
  private _activeLevel: AbstractLevel;

  private _onActiveLevelChangedSubject: Subject<AbstractLevel> = new Subject<AbstractLevel>();

  /**
   * Observable of active level changes
   * @type {Observable<AbstractLevel[]>}
   */
  onActiveLevelChanged: Observable<AbstractLevel> = this._onActiveLevelChangedSubject.asObservable();

  getActiveLevels(): AbstractLevel[] {
    return this._activeLevels;
  }

  getActiveLevel() {
    return this._activeLevel;
  }

  /**
   * Sets active levels
   * @param {AbstractLevel[]} levels array of levels to be set as active
   */
  setActiveLevels(levels: AbstractLevel[]) {
    this._activeLevels = levels;
  }

  setActiveLevel(index: number) {
    this._activeLevel = this._activeLevels[index];
    this._onActiveLevelChangedSubject.next(this._activeLevel);
  }

  nextLevel() {
    const index = this._activeLevels.indexOf(this._activeLevel);
    if (index + 1 < this._activeLevels.length) {
      this.setActiveLevel(index + 1);
    }
  }

}
