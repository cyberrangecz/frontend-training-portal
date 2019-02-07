import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {AbstractLevel} from "../../../../../model/level/abstract-level";
import {LevelConfigurationComponent} from "../level-configuration/level-configuration.component";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ComponentErrorHandlerService} from "../../../../../services/component-error-handler.service";
import {TrainingDefinitionFacade} from "../../../../../services/facades/training-definition-facade.service";
import {UnsavedChangesDialogComponent} from "../../unsaved-changes-dialog/unsaved-changes-dialog.component";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../../../../model/training/training-definition";

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
  @Input('trainingDefinition') trainingDefinition: TrainingDefinition;

  @Output('onLevelDeleted') onLevelDeleted: EventEmitter<number> = new EventEmitter();

  levels: AbstractLevel[];
  isLoading = true;
  selectedStep: number = 0;

  constructor(public dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ComponentErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      if (this.trainingDefinition) {
        this.resolveInitialLevels();
      }
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
    this.trainingDefinitionFacade.createInfoLevel(this.trainingDefinition.id)
      .subscribe(
        level => {
          this.isLoading = false;
          this.levels.push(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayHttpError(err, 'Creating info level')
      );
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.isLoading = true;
    this.trainingDefinitionFacade.createGameLevel(this.trainingDefinition.id)
      .subscribe(
        level => {
        this.isLoading = false;
          this.levels.push(level);
        },
        (err: HttpErrorResponse) =>  this.errorHandler.displayHttpError(err, 'Creating game level')
      );
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
   this.isLoading = true;
    this.trainingDefinitionFacade.createAssessmentLevel(this.trainingDefinition.id)
      .subscribe(
        level => {
          this.isLoading = false;
          this.levels.push(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayHttpError(err, 'Creating assessment level')
      );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the left)
   */
  swapLeft() {
    this.isLoading = true;
    const swappedLevel = this.levels[this.selectedStep];
    this.trainingDefinitionFacade.swapLeft(this.trainingDefinition.id, swappedLevel.id)
      .subscribe(resp => {
          this.selectedStep--;
          this.levels = resp.sort((levelA, levelB ) => levelA.order - levelB.order);
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Level "' + swappedLevel.title + '" was successfully swapped to the left');
          this.isLoading = false;
        },
        err => {
          this.errorHandler.displayHttpError(err, 'Swapping level "' + swappedLevel.title + '" to the left');
          this.isLoading = false;
        }
      );
  }
  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    this.isLoading = true;
    const swappedLevel = this.levels[this.selectedStep];
    this.trainingDefinitionFacade.swapRight(this.trainingDefinition.id, swappedLevel.id)
      .subscribe(resp => {
          this.selectedStep++;
          this.levels = resp.sort((levelA, levelB ) => levelA.order - levelB.order);
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Level "' + swappedLevel.title + '" was successfully swapped to the right');
          this.isLoading = false;
        },
        err => {
          this.errorHandler.displayHttpError(err, 'Swapping level "' + swappedLevel.title + '" to the right');
          this.isLoading = false;
        }
        );
  }

  /**
   * Deletes level on given index
   * @param {number} id index of level which should be deleted
   */
  deleteLevel(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:
        {
          type: 'level',
          title: this.levels.find(level => level.id === id).title
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.isLoading = true;
        const toDelete = this.levels.find(level => level.id === id);
        this.trainingDefinitionFacade.removeLevel(this.trainingDefinition.id, toDelete.id)
          .subscribe(resp => {
              this.alertService.emitAlert(AlertTypeEnum.Success ,'Level "' + toDelete.title + '" was successfully deleted');
              this.onLevelDeleted.emit(toDelete.id);
            },
              err => this.errorHandler.displayHttpError(err, 'Deleting level "' + toDelete.title + '"')
          );
      }
    });
  }

  /**
   * Triggered after selection of active level is changed in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    this.changeSelectedStep(event.selectedIndex);
    //TODO : this should only be used if lazy loading is implemented

    /*    if (this.getCanDeactivateLevels().find(level => level.order === this.selectedStep).canBeDeactivated) {
      this.changeSelectedStep(event.selectedStep);
    } else {
      this.resolveBySaveChangesDialog(event.selectedStep);
    }*/
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
    if (this.trainingDefinition.levels && this.trainingDefinition.levels.length > 0 && this.trainingDefinition.startingLevel) {
      this.levels = this.sortInitialLevels(this.trainingDefinition.levels);
    } else {
      this.levels = [];
    }
    this.isLoading = false;
  }

  private sortInitialLevels(levels: AbstractLevel[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    let currentLevel = this.findFirstLevel(levels);
    result.push(currentLevel);
    while (currentLevel && currentLevel.nextLevel) {
      currentLevel = levels.find(level => level.id === currentLevel.nextLevel);
      result.push(currentLevel);
    }
    return result;
  }

  private findFirstLevel(levels: AbstractLevel[]): AbstractLevel {
    const first = this.trainingDefinition.startingLevel;
    return levels.find(level => level.id === first)
  }

}


