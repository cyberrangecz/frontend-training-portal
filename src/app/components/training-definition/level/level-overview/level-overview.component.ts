import {Component, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {Observable, of, zip} from 'rxjs';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {ADD_LEVEL_PATH} from '../../training-definition-overview/paths';
import {UnsavedChangesDialogComponent} from '../../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {TrainingLevelStepperComponent} from '../training-level-stepper/training-level-stepper.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {BaseComponent} from '../../../base.component';
import {ActionConfirmationDialogComponent} from '../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {AlertService} from '../../../../services/shared/alert.service';
import {LevelEditService} from '../../../../services/training-definition/level-edit.service';
import {GameLevel} from '../../../../model/level/game-level';
import {InfoLevel} from '../../../../model/level/info-level';
import {AssessmentLevel} from '../../../../model/level/assessment-level';
import {AbstractLevelEditComponent} from '../level-edit/abstract-level-edit.component';
import {moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'kypo2-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.css']
})
/**
 * Smart wrapper component for level stepper and level edit components
 */
export class LevelOverviewComponent extends BaseComponent implements OnInit {

  @ViewChild(TrainingLevelStepperComponent, { static: true }) levelStepperComponent;
  @ViewChildren(AbstractLevelEditComponent) levelConfigurationComponents: QueryList<AbstractLevelEditComponent>;


  @Output() activeLevelChanged: EventEmitter<number> = new EventEmitter();

  trainingDefinition$: Observable<TrainingDefinition>;
  activeStep$: Observable<number>;

  isWaitingOnServerResponse: boolean;
  levels: AbstractLevel[] = [];

  trainingDefinitionResolvedId: number;
  selectedLevelId: number;


  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private levelService: LevelEditService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
  }

  ngOnInit() {
    this.trainingDefinition$ = this.activeRoute.data
      .pipe(
        map(data => data.trainingDefinition)
      );
    this.activeStep$ = this.resolveActiveStep();
    this.subscribeLevelUpdates();
  }

  onActiveLevelChange(levelId: number) {
    this.selectedLevelId = levelId;
    if (levelId === -1) {
      setTimeout(() => this.router.navigate(['..', ADD_LEVEL_PATH], { relativeTo: this.activeRoute }), 10);
    }
    this.router.navigate(['..', levelId], { relativeTo: this.activeRoute });
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.levelStepperComponent.canDeactivate();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    const canDeactivateLevelsInfo = this.getCanDeactivateLevels().filter(levelCanDeactivateInfo => !levelCanDeactivateInfo.canBeDeactivated);
    if (canDeactivateLevelsInfo.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Following levels are not saved: ' + canDeactivateLevelsInfo.map(levelInfo => levelInfo.order)],
          saveOption: false
        },
      });
      return dialogRef.afterClosed()
        .pipe(
          map(result => result && result.type === 'confirm')
        );
    }
    return of(true);
  }

  private resolveActiveStep(): Observable<number> {
    return this.resolveActiveLevelId()
      .pipe(
        switchMap(levelId => this.trainingDefinition$
          .pipe(
            map(td =>
             td ? td.levels.findIndex(level => level.id === levelId) : -1
            )
          )
        )
      );
  }

  private resolveActiveLevelId(): Observable<number> {
    const firstLevelId = this.trainingDefinition$
      .pipe(
        map(td => td && td.levels.length > 0 ? td.levels[0].id : -1));

    const routeId = this.activeRoute.paramMap
      .pipe(
        map(params => {
          const levelId = Number(params.get('levelId'));
          if (levelId && !Number.isNaN(levelId)) {
            return levelId;
          }
          return -1;
        })
      );

    return zip(firstLevelId, routeId)
      .pipe(
        map(result => {
          if (result[0] === -1 && result[1] === -1) {
            return -1;
          } else if (result[1] === -1) {
            return result[0];
          } else {
            return result[1];
          }
        })
      );
  }

  /**
   * Creates new info level with default values
   */
  addInfoLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createInfoLevel(this.trainingDefinitionResolvedId)
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          level = this.initLevel('info', level);
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayInAlert(err, 'Creating info level')
      );
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createAssessmentLevel(this.trainingDefinitionResolvedId)
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          level = this.initLevel('assignment', level);
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayInAlert(err, 'Creating assessment level')
      );
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createGameLevel(this.trainingDefinitionResolvedId)
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          level = this.initLevel('videogame_asset', level);
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) =>  this.errorHandler.displayInAlert(err, 'Creating game level')
      );
  }

  /**
   * Determines if all levels in level stepper were saved and user can navigate to different component
   * @returns {{ canDeactivate: boolean, order: number }[]} object with list of levels which can be deactivated and its order (index)
   */
  getCanDeactivateLevels(): { canBeDeactivated: boolean, order: number }[] {
    const levels = [];
    this.levelConfigurationComponents.forEach((levelComponent , i) => {
        const levelCanDeactivate = levelComponent.canDeactivate();
        levels.push(
          {
            canBeDeactivated: levelCanDeactivate,
            order: i + 1
          });
      }
    );
    return levels;
  }

  private initLevel(icon: string, level: GameLevel | InfoLevel | AssessmentLevel): GameLevel | InfoLevel | AssessmentLevel {
    level.icon = icon;
    level.isActive = false;
    level.isSaved = true;
    return level;
  }

  private onLevelAdded(level: AbstractLevel) {
    this.isWaitingOnServerResponse = false;
    this.levels.push(level);
    // hack to workaround fact that changes are not presented in stepper because ngOnChanges checks only object identity
    this.levels = this.levels.slice();
    this.navigateToLastLevel();
  }
  updateTrainingDefinitionLevels(event) {
    this.levels = event;
  }

  onLevelSwap(event) {
    const indexTo = event.indexes.previousIndex;
    const indexFrom = event.indexes.currentIndex;
    // move items back as they were before swap to get correct values
    moveItemInArray(this.levels, indexFrom, indexTo);

    const from = this.levels[indexFrom];
    const to = this.levels[indexTo];
    // move back to after swap state - present state being presented to user
    moveItemInArray(this.levels, indexTo, indexFrom);

    this.trainingDefinitionFacade.swapLevels(event.trainingDefinitionId, from.id, to.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(swappedLevelsInfo => {
          this.levels = this.levels.slice();
        },
        err => {
          this.swapLevelsLocally(indexTo, indexFrom);
          this.errorHandler.displayInAlert(err, `Swapping level ${from.title}`);
        }
      );
  }

  private swapLevelsLocally(from: number, to: number) {
    const tempLevel = this.levels[from];
    this.levels[from] = this.levels[to];
    this.levels[to] = tempLevel;
    this.levels = this.levels.slice();
  }
  /**
   * Deletes level on given index
   * @param {number} toDeleteId index of level which should be deleted
   */
  onDeleteLevel(toDeleteId: number) {
    const levelToDelete = this.findLevel(this.levels, toDeleteId);
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data:
        {
          type: 'level',
          action: 'delete',
          title: levelToDelete.title
        }
    });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.sendDeleteLevelRequest(levelToDelete);
        }
      });
  }

  private sendDeleteLevelRequest(levelToDelete: AbstractLevel) {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.deleteLevel(this.trainingDefinitionResolvedId, levelToDelete.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(updatedLevels => {
          this.alertService.emitAlert(AlertTypeEnum.Success , 'Level "' + levelToDelete.title + '" was successfully deleted');
          this.levels = this.levels.filter(level => level.id !== levelToDelete.id);
          this.levels = this.levels.slice();

          this.navigateToPreviousLevel();
          this.isWaitingOnServerResponse = false;
        },
        err => {
          this.errorHandler.displayInAlert(err, 'Deleting level "' + levelToDelete.title + '"');
          this.isWaitingOnServerResponse = false;

        });
  }

  private findLevel(levels: AbstractLevel[], levelId): AbstractLevel {
    return levels.find(level => level.id === levelId);
  }
  private changeSelectedStep(index: number) {
    this.activeStep$ = of(index);
  }

  private subscribeLevelUpdates() {
    this.levelService.onLevelUpdated
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(level => this.updateLevelTitle(level));
  }

  private updateLevelTitle(level: AbstractLevel) {
    const levelToUpdate = this.findLevel(this.levels, level.id);
    if (levelToUpdate) {
      levelToUpdate.title = level.title;
    }
  }

  private navigateToLastLevel() {
    this.changeSelectedStep(this.levels.length - 1);
    this.activeLevelChanged.emit(this.levels[this.levels.length - 1].id);
  }

  private navigateToPreviousLevel() {
    const previousStep = this.levels.length - 1;
    const levelId = this.levels.length > 0 ? this.levels[previousStep].id : -1;
    this.activeLevelChanged.emit(levelId);
    this.changeSelectedStep(previousStep);
  }
}
