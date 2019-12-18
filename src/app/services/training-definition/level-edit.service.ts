import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';
import { AbstractLevelTypeEnum } from '../../model/enums/abstract-level-type.enum';
import { AlertTypeEnum } from '../../model/enums/alert-type.enum';
import { AbstractLevel } from '../../model/level/abstract-level';
import { AssessmentLevel } from '../../model/level/assessment-level';
import { GameLevel } from '../../model/level/game-level';
import { InfoLevel } from '../../model/level/info-level';
import { TrainingDefinitionFacade } from '../facades/training-definition-facade.service';
import { AlertService } from '../shared/alert.service';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Injectable()
export class LevelEditService {

  private trainingDefinitionId: number;

  private levelsSubject: BehaviorSubject<AbstractLevel[]> = new BehaviorSubject([]);
  levels$ = this.levelsSubject.asObservable();

  private activeStepSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  activeStep$ = this.activeStepSubject.asObservable();

  private activeLevelCanBeSavedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  activeLevelCanBeSaved$: Observable<boolean> = this.activeLevelCanBeSavedSubject.asObservable();

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
    private errorHandler: ErrorHandlerService,
    private alertService: AlertService) {
  }

  set(trainingDefinitionId: number, levels: AbstractLevel[]) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.levelsSubject.next(levels);
  }

  getLevelsCount(): number {
    return this.levelsSubject.getValue().length;
  }

  setActiveStep(stepIndex: number) {
    this.activeStepSubject.next(stepIndex);
    this.setLevelCanBeSaved(this.getSelected());
  }

  onActiveLevelChanged(level: AbstractLevel) {
    level.isUnsaved = true;
    const newLevels = this.levelsSubject.getValue();
    newLevels[this.activeStepSubject.getValue()] = level;
    this.levelsSubject.next(newLevels);
    this.setLevelCanBeSaved(level);
  }

  forceStepperUpdate() {
    // need to pass levels as new object to trigger change detection in level stepper component
    this.levelsSubject.next(Array.from(this.levelsSubject.value));
  }

  setLevelCanBeSaved(level: AbstractLevel, value?: boolean) {
    if (this.levelsSubject.getValue().length > 0 && level.id === this.getSelected().id) {
      if (value !== undefined) {
        this.activeLevelCanBeSavedSubject.next(value);
      } else {
        this.activeLevelCanBeSavedSubject.next(level.valid && level.isUnsaved);
      }
    }
  }

  getSelected(): AbstractLevel {
    return this.levelsSubject.getValue()[this.activeStepSubject.getValue()];
  }

  getUnsavedLevels(): AbstractLevel[] {
    return this.levelsSubject.getValue().filter(level => level.isUnsaved);
  }

  navigateToLastLevel() {
    this.setActiveStep(this.levelsSubject.getValue().length - 1);
  }

  navigateToPreviousLevel() {
    const curr = this.activeStepSubject.getValue();
    if (curr > 0) {
      this.setActiveStep(curr - 1);
    } else {
      this.setActiveStep(0);
    }
  }

  add(levelType): Observable<AbstractLevel> {
    switch (levelType) {
      case AbstractLevelTypeEnum.Info: return this.addInfoLevel();
      case AbstractLevelTypeEnum.Assessment: return this.addAssessmentLevel();
      case AbstractLevelTypeEnum.Game: return this.addGameLevel();
      default: console.error('Unsupported type of level in add method od LevelEditService');
    }
  }

  save(level: AbstractLevel, silentSave = false): Observable<any> {
    this.setLevelCanBeSaved(level, false);
    return this.sendRequestToSaveLevel(level)
      .pipe(
        tap(_ => {
          this.onLevelSaved(level);
          if (!silentSave) {
            this.alertService.emitAlert(AlertTypeEnum.Success, `Level ${level.title} saved`);
          }
        },
          err => {
            this.setLevelCanBeSaved(level);
            this.errorHandler.display(err, `Saving level ${level.title}`);
          })
      );
  }

  delete(level: AbstractLevel): Observable<AbstractLevel[]> {
    return this.trainingDefinitionFacade.deleteLevel(this.trainingDefinitionId, level.id)
      .pipe(
        tap(_ => this.onLevelDeleted(level.id),
          err => this.errorHandler.display(err, 'Deleting level "' + level.title + '"')
        )
      );
  }

  move(fromIndex, toIndex): Observable<any> {
    const levels = this.levelsSubject.getValue();
    const from = levels[toIndex]; // because it was already changed. It will be fixed when stepper supports snapshots
    return this.trainingDefinitionFacade.moveLevels(this.trainingDefinitionId, from.id, toIndex)
      .pipe(
        tap({
          error: (err) => {
            this.moveRollback(fromIndex, toIndex);
            this.errorHandler.display(err, `Moving level "${from.title}"`);
          }
        })
      );
  }


  private moveRollback(fromIndex: number, toIndex: number) {
    const levels = this.levelsSubject.getValue();
    const tempLevel = levels[toIndex];
    levels[toIndex] = levels[fromIndex];
    levels[fromIndex] = tempLevel;
    this.levelsSubject.next(levels);
    this.setActiveStep(fromIndex);
  }

  private addGameLevel(): Observable<GameLevel> {
    return this.trainingDefinitionFacade.createGameLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id) as Observable<GameLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding game level')
        )
      );
  }

  private addInfoLevel(): Observable<InfoLevel> {
    return this.trainingDefinitionFacade.createInfoLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id) as Observable<InfoLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding info level')
        )
      );
  }

  private addAssessmentLevel(): Observable<AssessmentLevel> {
    return this.trainingDefinitionFacade.createAssessmentLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id) as Observable<AssessmentLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding assessment level')
        )
      );
  }

  private onLevelDeleted(deletedId: number) {
    this.levelsSubject.next(this.levelsSubject.getValue().filter(level => level.id !== deletedId));
    this.navigateToPreviousLevel();
  }

  private onLevelAdded(level: AbstractLevel) {
    this.levelsSubject.getValue().push(level);
  }

  private sendRequestToSaveLevel(level: AbstractLevel): Observable<any> {
    switch (true) {
      case level instanceof InfoLevel: return this.saveInfoLevel(level as InfoLevel);
      case level instanceof AssessmentLevel: return this.saveAssessmentLevel(level as AssessmentLevel);
      case level instanceof GameLevel: return this.saveGameLevel(level as GameLevel);
      default: console.error('Unsupported instance of level in save method od LevelEditService');
    }
  }

  private saveInfoLevel(level: InfoLevel): Observable<any> {
    return this.trainingDefinitionFacade.updateInfoLevel(this.trainingDefinitionId, level);
  }

  private saveGameLevel(level: GameLevel): Observable<any> {
    return this.trainingDefinitionFacade.updateGameLevel(this.trainingDefinitionId, level);
  }

  private saveAssessmentLevel(level: AssessmentLevel): Observable<any> {
    return this.trainingDefinitionFacade.updateAssessmentLevel(this.trainingDefinitionId, level);
  }

  private onLevelSaved(level: AbstractLevel) {
    level.isUnsaved = false;
    level.valid = true;
    this.setLevelCanBeSaved(level);
  }

}
