import {Injectable} from "@angular/core";
import {AbstractLevel} from "../model/level/abstract-level";
import {InfoLevel} from "../model/level/info-level";
import {AssessmentLevel} from "../model/level/assessment-level";
import {GameLevel} from "../model/level/game-level";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class LevelService {
  private _levels: AbstractLevel[] = [];
  private _activeLevel: AbstractLevel;

  private _onActiveLevelChangeSubject: Subject<AbstractLevel> = new Subject<AbstractLevel>();
  onActiveLevelChange: Observable<AbstractLevel> = this._onActiveLevelChangeSubject.asObservable();

  constructor() {

  }

  setLevels(levels: AbstractLevel[]) {
    this._levels = levels;
  }

  getLevels(): AbstractLevel[] {
    return this._levels;
  }

  setActiveLevel(level: AbstractLevel) {
    this._activeLevel = level;
    this._onActiveLevelChangeSubject.next(level);
  }

  getActiveLevel(): AbstractLevel {
    return this._activeLevel;
  }

  addLevel(level: AbstractLevel) {
    this._levels.push(level);
  }

  removeLevel(index: number) {
    this._levels.slice(index, 1);
  }

  isInfoLevelActive(): boolean {
    return this._activeLevel instanceof InfoLevel;
  }

  isAssessmentLevelActive(): boolean {
    return this._activeLevel instanceof AssessmentLevel;
  }

  isGameLevelActive(): boolean {
    return this._activeLevel instanceof GameLevel;
  }

  swapOrder(fst: number, snd: number) {

  }

  saveLevel() {

  }
}
