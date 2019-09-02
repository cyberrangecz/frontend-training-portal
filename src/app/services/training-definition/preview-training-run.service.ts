import {Injectable} from '@angular/core';
import { Location } from '@angular/common';
import {Observable, of, ReplaySubject} from 'rxjs';
import {AbstractLevel} from '../../model/level/abstract-level';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {GameLevel} from '../../model/level/game-level';
import {TrainingRunGameLevelService} from '../training-run/training-run-game-level.service';
import {PreviewGameLevelService} from './preview-game-level.service';

@Injectable()
/**
 * Mocks behavior of training run service connected to backend for preview/testing purposes
 */
export class PreviewTrainingRunService {

  constructor(private gameService: TrainingRunGameLevelService,
              private location: Location) {}

  private levels: AbstractLevel[] = [];
  private activeLevelIndex: number;
  private isStepperDisplayed: boolean;

  private activeLevelSubject: ReplaySubject<AbstractLevel> = new ReplaySubject(1);
  activeLevel$: Observable<AbstractLevel> = this.activeLevelSubject.asObservable();

  setUpFromTrainingRun(trainingRunInfo: AccessTrainingRunInfo) {
    this.levels = trainingRunInfo.levels;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.activeLevelIndex = 0;
    const firstLevel = this.levels[this.activeLevelIndex];
    this.activeLevelSubject.next(firstLevel);
    if (firstLevel instanceof GameLevel && this.gameService instanceof PreviewGameLevelService) {
      this.gameService.init(firstLevel);
    }
  }

  getLevels(): AbstractLevel[] {
    return this.levels;
  }

  getActiveLevel(): AbstractLevel {
    return this.levels[this.activeLevelIndex];
  }

  getActiveLevelPosition(): number {
    return this.activeLevelIndex;
  }

  getStartTime(): Date {
    return new Date();
  }

  getIsStepperDisplayed(): boolean {
    return this.isStepperDisplayed;
}

  nextLevel(): Observable<AbstractLevel> {
    this.activeLevelIndex++;
    const nextLevel = this.levels[this.activeLevelIndex];
    if (nextLevel instanceof GameLevel && this.gameService instanceof PreviewGameLevelService) {
      this.gameService.init(nextLevel);
    }
    this.activeLevelSubject.next(nextLevel);
    return of(nextLevel);
  }

  hasNextLevel(): boolean {
    return this.activeLevelIndex < this.levels.length - 1;
  }

  finish(): Observable<any> {
    this.clear();
    this.location.back();
    return of(true);
  }

  clear() {
    this.levels = [];
    this.activeLevelIndex = 0;
  }
}
