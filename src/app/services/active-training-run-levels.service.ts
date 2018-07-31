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

  private _onActiveLevelsChangedSubject: Subject<AbstractLevel[]> = new Subject<AbstractLevel[]>();

  /**
   * Observable of active levels changes
   * @type {Observable<AbstractLevel[]>}
   */
  onActiveLevelChanged: Observable<AbstractLevel[]> = this._onActiveLevelsChangedSubject.asObservable();

  getActiveLevels(): AbstractLevel[] {
    return this._activeLevels;
  }

  getActiveLevel(index: number) {
    return this._activeLevels[index];
  }

  /**
   * Sets active levels
   * @param {AbstractLevel[]} levels array of levels to be set as active
   */
  setActiveLevels(levels: AbstractLevel[]) {
    this._activeLevels = levels;
    this._onActiveLevelsChangedSubject.next(levels);
  }

}
