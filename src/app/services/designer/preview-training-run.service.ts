import {Injectable} from "@angular/core";
import { Location } from '@angular/common';
import {Observable, of, Subject} from "rxjs";
import {AbstractLevel} from "../../model/level/abstract-level";
import {AccessTrainingRunInfo} from "../../model/training/access-training-run-info";
import {GameLevel} from "../../model/level/game-level";
import {TrainingRunGameLevelService} from "../trainee/training-run-game-level.service";
import {PreviewGameLevelService} from "./preview-game-level.service";

@Injectable()
export class PreviewTrainingRunService {

  constructor(private gameService: TrainingRunGameLevelService,
              private location: Location) {}

  private _levels: AbstractLevel[] = [];
  private _activeLevelIndex: number;
  private _isStepperDisplayed: boolean;

  private _onActiveLevelChangedSubject: Subject<AbstractLevel> = new Subject();
  onActiveLevelChanged: Observable<AbstractLevel> = this._onActiveLevelChangedSubject.asObservable();

  setUpFromTrainingRun(trainingRunInfo: AccessTrainingRunInfo) {
    this._levels = trainingRunInfo.levels;
    this._isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this._activeLevelIndex = 0;
    const firstLevel = this._levels[this._activeLevelIndex];
    if (firstLevel instanceof GameLevel && this.gameService instanceof PreviewGameLevelService) {
      this.gameService.init(firstLevel);
    }
  }

  getLevels(): AbstractLevel[] {
    return this._levels;
  }

  getActiveLevel(): AbstractLevel {
    return this._levels[this._activeLevelIndex];
  }

  getActiveLevelPosition(): number {
    return this._activeLevelIndex;
  }

  getStartTime(): Date {
    return new Date();
  }

  getIsStepperDisplayed(): boolean {
    return this._isStepperDisplayed;
}

  nextLevel(): Observable<AbstractLevel> {
    this._activeLevelIndex++;
    const nextLevel = this._levels[this._activeLevelIndex];
    if (nextLevel instanceof GameLevel && this.gameService instanceof PreviewGameLevelService) {
      this.gameService.init(nextLevel);
    }
    this._onActiveLevelChangedSubject.next(nextLevel);
    return of(nextLevel);
  }

  hasNextLevel(): boolean {
    return this._activeLevelIndex < this._levels.length - 1;
  }

  finish(): Observable<any> {
    this.clear();
    this.location.back();
    return of(true);
  }

  clear() {
    this._levels = [];
    this._activeLevelIndex = 0;
  }
}
