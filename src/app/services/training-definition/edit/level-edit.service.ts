import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AbstractLevelTypeEnum} from '../../../model/enums/abstract-level-type.enum';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {Level} from '../../../model/level/level';
import {AssessmentLevel} from '../../../model/level/assessment-level';
import {GameLevel} from '../../../model/level/game-level';
import {InfoLevel} from '../../../model/level/info-level';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';

/**
 * Service handling editing of training definition's levels and related operations.
 * Serves as a layer between component and API service
 * Subscribe to levels$, activeStep$ and activeLevelCanBeSaved$ to receive latest data updates.
 */
@Injectable()
export class LevelEditService {

  private trainingDefinitionId: number;

  private levelsSubject$: BehaviorSubject<Level[]> = new BehaviorSubject([]);
  /**
   * All currently edited levels of training definition
   */
  levels$ = this.levelsSubject$.asObservable();

  private activeStepSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  /**
   * Index of selected level
   */
  activeStep$ = this.activeStepSubject.asObservable();

  private activeLevelCanBeSavedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * True if selected level is valid and can be saved, false otherwise
   */
  activeLevelCanBeSaved$: Observable<boolean> = this.activeLevelCanBeSavedSubject.asObservable();

  constructor(private trainingDefinitionFacade: TrainingDefinitionApi,
    private errorHandler: ErrorHandlerService,
    private alertService: AlertService) {
  }

  /**
   * Initiates service with levels and related training definition id
   * @param trainingDefinitionId id of training definition
   * @param levels all levels associated with training definition id
   */
  set(trainingDefinitionId: number, levels: Level[]) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.levelsSubject$.next(levels);
  }

  getLevelsCount(): number {
    return this.levelsSubject$.getValue().length;
  }

  setActiveLevel(levelIndex: number) {
    this.activeStepSubject.next(levelIndex);
    this.setLevelCanBeSaved(this.getSelected());
  }

  /**
   * Performs necessary actions to initiate and update values related to active level change
   * @param level new active level
   */
  onActiveLevelChanged(level: Level) {
    level.isUnsaved = true;
    const newLevels = this.levelsSubject$.getValue();
    newLevels[this.activeStepSubject.getValue()] = level;
    this.levelsSubject$.next(newLevels);
    this.setLevelCanBeSaved(level);
  }

  forceStepperUpdate() {
    // need to pass levels as new object to trigger change detection in level stepper component
    this.levelsSubject$.next(Array.from(this.levelsSubject$.value));
  }

  /**
   * Determines whether passed level can be saved. Optionally, if value is passed as an argument,
   * it uses value of the argument.
   * @param level level to determine
   * @param value pre-determined result
   */
  setLevelCanBeSaved(level: Level, value?: boolean) {
    if (this.levelsSubject$.getValue().length > 0 && level.id === this.getSelected().id) {
      if (value !== undefined) {
        this.activeLevelCanBeSavedSubject.next(value);
      } else {
        this.activeLevelCanBeSavedSubject.next(level.valid && level.isUnsaved);
      }
    }
  }

  getSelected(): Level {
    return this.levelsSubject$.getValue()[this.activeStepSubject.getValue()];
  }

  getUnsavedLevels(): Level[] {
    return this.levelsSubject$.getValue().filter(level => level.isUnsaved);
  }

  navigateToLastLevel() {
    this.setActiveLevel(this.levelsSubject$.getValue().length - 1);
  }

  navigateToPreviousLevel() {
    const curr = this.activeStepSubject.getValue();
    if (curr > 0) {
      this.setActiveLevel(curr - 1);
    } else {
      this.setActiveLevel(0);
    }
  }

  /**
   * Creates new level with default values based on passed level type
   * @param levelType enum of possible level types
   */
  add(levelType: AbstractLevelTypeEnum): Observable<Level> {
    switch (levelType) {
      case AbstractLevelTypeEnum.Info: return this.addInfoLevel();
      case AbstractLevelTypeEnum.Assessment: return this.addAssessmentLevel();
      case AbstractLevelTypeEnum.Game: return this.addGameLevel();
      default: console.error('Unsupported type of level in add method od LevelEditService');
    }
  }

  /**
   * Saves changes in edited level and optionally informs on result of the operation
   * @param level level to be saved
   * @param silentSave whether or not to display alerts when save was successful
   */
  save(level: Level, silentSave = false): Observable<any> {
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

  /**
   * Delets selected level and displays alert with result of the operation
   * @param level level tobe deleted
   */
  delete(level: Level): Observable<Level[]> {
    return this.trainingDefinitionFacade.deleteLevel(this.trainingDefinitionId, level.id)
      .pipe(
        tap(_ => this.onLevelDeleted(level.id),
          err => this.errorHandler.display(err, 'Deleting level "' + level.title + '"')
        )
      );
  }

  /**
   * Moves level from index to a new one. Updates optimistically and rollback is performed on error
   * @param fromIndex current index of level
   * @param toIndex new index of level
   */
  move(fromIndex, toIndex): Observable<any> {
    const levels = this.levelsSubject$.getValue();
    const from = levels[fromIndex];
    return this.trainingDefinitionFacade.moveLevelTo(this.trainingDefinitionId, from.id, toIndex)
      .pipe(
        tap({
          error: (err) => {
            this.moveRollback(fromIndex);
            this.errorHandler.display(err, `Moving level "${from.title}"`);
          }
        })
      );
  }

  private moveRollback(fromIndex: number) {
    const levels = this.levelsSubject$.getValue();
    this.levelsSubject$.next(levels.sort((a, b) => a.order - b.order));
    this.setActiveLevel(fromIndex);
  }

  private addGameLevel(): Observable<GameLevel> {
    return this.trainingDefinitionFacade.createGameLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevel(basicLevelInfo.id) as Observable<GameLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding game level')
        )
      );
  }

  private addInfoLevel(): Observable<InfoLevel> {
    return this.trainingDefinitionFacade.createInfoLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevel(basicLevelInfo.id) as Observable<InfoLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding info level')
        )
      );
  }

  private addAssessmentLevel(): Observable<AssessmentLevel> {
    return this.trainingDefinitionFacade.createAssessmentLevel(this.trainingDefinitionId)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevel(basicLevelInfo.id) as Observable<AssessmentLevel>),
        tap(level => this.onLevelAdded(level),
          err => this.errorHandler.display(err, 'Adding assessment level')
        )
      );
  }

  private onLevelDeleted(deletedId: number) {
    this.levelsSubject$.next(this.levelsSubject$.getValue().filter(level => level.id !== deletedId));
    this.navigateToPreviousLevel();
  }

  private onLevelAdded(level: Level) {
    this.levelsSubject$.getValue().push(level);
  }

  private sendRequestToSaveLevel(level: Level): Observable<any> {
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

  private onLevelSaved(level: Level) {
    level.isUnsaved = false;
    level.valid = true;
    this.setLevelCanBeSaved(level);
  }

}
