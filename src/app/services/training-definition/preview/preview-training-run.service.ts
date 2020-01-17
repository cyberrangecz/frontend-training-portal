import { Location } from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Level} from '../../../model/level/level';
import {GameLevel} from '../../../model/level/game-level';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {TrainingRunGameLevelService} from '../../training-run/running/training-run-game-level.service';
import {PreviewGameLevelService} from './preview-game-level.service';

@Injectable()
/**
 * Mocks behavior of training run service connected to backend for designers preview purposes
 */
export class PreviewTrainingRunService {

  constructor(private gameService: TrainingRunGameLevelService,
              private location: Location) {}

  private levels: Level[] = [];
  private activeLevelIndex: number;
  private isStepperDisplayed: boolean;

  private activeLevelSubject: ReplaySubject<Level> = new ReplaySubject(1);
  activeLevel$: Observable<Level> = this.activeLevelSubject.asObservable();

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

  access(accessToken: string): Observable<number> {
    console.error(
      'It seems like you tried to use access token method to start training run in preview mode.' +
      ' Please you setUpFromTrainingRun() method to setup preview'
    );
    return of(-1);
  }

  getLevels(): Level[] {
    return this.levels;
  }

  getActiveLevel(): Level {
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

  nextLevel(): Observable<Level> {
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
