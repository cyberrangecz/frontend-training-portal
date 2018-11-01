import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {AbstractLevel} from "../../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../../model/level/info-level";
import {GameLevel} from "../../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {AssessmentTypeEnum} from "../../../../../enums/assessment-type.enum";
import {LevelConfigurationComponent} from "../level-configuration/level-configuration.component";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";
import {TrainingDefinitionSetterService} from "../../../../../services/data-setters/training-definition-setter.service";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {environment} from "../../../../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {ComponentErrorHandlerService} from "../../../../../services/component-error-handler.service";
import {TrainingDefinitionGetterService} from "../../../../../services/data-getters/training-definition-getter.service";
import {UnsavedChangesDialogComponent} from "../../unsaved-changes-dialog/unsaved-changes-dialog.component";
import {map} from "rxjs/operators";

@Component({
  selector: 'training-level-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
/**
 * Component of training level stepper which is used to create new or edit existing levels in training definition.
 */
export class TrainingLevelStepperComponent implements OnInit, OnChanges {

  @ViewChildren(LevelConfigurationComponent) levelConfigurationComponents: QueryList<LevelConfigurationComponent>;

  @Input('isTrainingSaved') isTrainingSaved: boolean;
  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Input('levels') levels: AbstractLevel[];

  isLoading = false;
  selectedStep: number = 0;

  constructor(public dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ComponentErrorHandlerService,
              private trainingDefinitionGetter: TrainingDefinitionGetterService,
              private trainingDefinitionSetter: TrainingDefinitionSetterService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('levels' in changes) {
      this.resolveInitialLevels();
    }
  }

  /**
   * Determines if all levels in level stepper were saved and user can navigate to different component
   * @returns {{ canDeactivate: boolean, order: number }[]} object with list of levels which can be deactivated and its order (index)
   */
  getCanDeactivateLevels(): { canBeDeactivated: boolean, order: number }[] {
    const levels = [];
    this.levelConfigurationComponents.forEach(levelComponent => {
      const levelCanDeactivate = levelComponent.level.id !== undefined && levelComponent.canDeactivate(); // if level does not have id it is a new level and has not been saved yet
      levels.push(
        {
          canBeDeactivated: levelCanDeactivate,
          title: levelComponent.level.title
        });
      }
    );
    return levels
  }

  /**
   * Creates new info level with default values
   */
  addInfoLevel() {
    this.isLoading = true;
    const newInfoLevel = new InfoLevel();
    newInfoLevel.id = null;

    this.trainingDefinitionSetter.createInfoLevel(this.trainingDefinitionId)
      .subscribe(
        id => {
          this.isLoading = false;
          newInfoLevel.id = id;
          this.levels.push(newInfoLevel);
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => this.errorHandler.displayHttpError(err, 'Creating info level')
      );
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.isLoading = true;
    const newGameLevel = new GameLevel();
    this.trainingDefinitionSetter.createGameLevel(this.trainingDefinitionId)
      .subscribe(
        id => {
        newGameLevel.id = id;
        this.levels.push(newGameLevel);
        this.isLoading = false
        },
        (err: HttpErrorResponse) =>  this.errorHandler.displayHttpError(err, 'Creating game level')
      );
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
   this.isLoading = true;
    const newAssessmentLevel = new AssessmentLevel();
    this.trainingDefinitionSetter.createAssessmentLevel(this.trainingDefinitionId)
      .subscribe(
        id => {
          newAssessmentLevel.id = id;
          this.levels.push(newAssessmentLevel);
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => this.errorHandler.displayHttpError(err, 'Creating assessment level')
      );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the left)
   */
  swapLeft() {
    this.isLoading = true;
    this.trainingDefinitionSetter.swapLeft(this.trainingDefinitionId, this.levels[this.selectedStep].id)
      .subscribe(resp => this.refreshLevels(),
          err => this.errorHandler.displayHttpError(err, 'Swapping level to the left')
      );
  }
  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    this.isLoading = true;
    this.trainingDefinitionSetter.swapRight(this.trainingDefinitionId, this.levels[this.selectedStep].id)
      .subscribe(resp => this.refreshLevels(),
        err => this.errorHandler.displayHttpError(err, 'Swapping level to the right')
        );
  }

  private refreshLevels() {
    this.isLoading = true;
    this.trainingDefinitionGetter.getTrainingDefinitionById(this.trainingDefinitionId)
      .subscribe(resp => {
        this.isLoading = false;
        this.levels = resp.levels;
      },
          err => {
        this.isLoading = false;
        this.errorHandler.displayHttpError(err, 'Reloading levels')
      });
  }

  /**
   * Deletes level on given index
   * @param {number} index index of level which should be deleted
   */
  deleteLevel(index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:
        {
          type: 'level',
          title: this.levels[index].title
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.isLoading = true;
        this.trainingDefinitionSetter.removeLevel(this.trainingDefinitionId, this.levels[index].id)
          .subscribe(response => this.refreshLevels(),
            err => this.errorHandler.displayHttpError(err, 'Deleting level')
          );
      }
    });
  }

  /**
   * Triggered after selection of active level is changed in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    if (this.getCanDeactivateLevels().find(level => level.order === this.selectedStep).canBeDeactivated) {
      this.changeSelectedStep(event.selectedStep);
    } else {
      this.resolveBySaveChangesDialog(event.selectedStep);
    }
  }

  private resolveBySaveChangesDialog(selectedLevelIndex: number) {
    const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
      data: {
        payload: ['Current level is not saved. Do you want to discard changes?'],
        saveOption: true
      }
    });
    dialogRef.afterClosed().pipe(map(result => {
      if (result && result.type === 'confirm') {
        this.changeSelectedStep(selectedLevelIndex);
      }
    }))
  }

  private changeSelectedStep(index: number) {
    this.selectedStep = index;
  }

  /**
   * Initializes levels with default values
   */
  private resolveInitialLevels() {
    if (!this.levels) {
      this.levels = [];
    }
  }
}


