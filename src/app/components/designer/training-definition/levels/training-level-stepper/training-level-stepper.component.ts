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
              private trainingDefinitionSetter: TrainingDefinitionSetterService) {
  }

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
          order: levelComponent.level.order
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
    const newInfoLevel = new InfoLevel(this.trainingDefinitionId,
      "New Info Level",
      0,
      this.levels.length + 1,
      '',
      '',
      '');
    newInfoLevel.id = null;

    this.trainingDefinitionSetter.createInfoLevel(this.trainingDefinitionId, newInfoLevel)
      .subscribe(
        id => {
          this.isLoading = false;
          newInfoLevel.id = id;
          this.levels.push(newInfoLevel);
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => this.handleHttpError(err)
      );
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.isLoading = true;
    const newGameLevel = new GameLevel(this.trainingDefinitionId,
      "New Game Level",
      100,
      this.levels.length + 1,
      '',
      '',
      '',
      [],
      '',
      '',
      0,
      5,
      true);
    this.trainingDefinitionSetter.createGameLevel(this.trainingDefinitionId, newGameLevel)
      .subscribe(
        id => {
        newGameLevel.id = id;
        this.levels.push(newGameLevel);
        this.isLoading = false
        },
        (err: HttpErrorResponse) =>  this.handleHttpError(err));
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
   this.isLoading = true;
    const newAssessmentLevel = new AssessmentLevel(this.trainingDefinitionId,
      "New Assessment Level",
      0,
      this.levels.length + 1,
      '',
      '',
      null,
      AssessmentTypeEnum.Questionnaire);
    this.trainingDefinitionSetter.createAssessmentLevel(this.trainingDefinitionId, newAssessmentLevel)
      .subscribe(
        id => {
          newAssessmentLevel.id = id;
          this.levels.push(newAssessmentLevel);
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => this.handleHttpError(err)
      );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the left)
   */
  swapLeft() {
    this.isLoading = true;
    if (this.selectedStep !== 0) {
      this.trainingDefinitionSetter.swapLeft(this.trainingDefinitionId, this.levels[this.selectedStep].id)
        .subscribe(resp => {
          this.isLoading = false;
        },
          (err: HttpErrorResponse) => this.handleHttpError(err));

      // TODO: Should be reloaded from REST API instead of calculating?
      const tempLevel = this.levels[this.selectedStep - 1];
      tempLevel.order += 1;

      this.levels[this.selectedStep].order -= 1;
      this.levels[this.selectedStep - 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep -= 1;
    }
  }
  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    this.isLoading = true;
    if (this.selectedStep !== this.levels.length - 1) {
      this.trainingDefinitionSetter.swapRight(this.trainingDefinitionId, this.levels[this.selectedStep].id)
        .subscribe(resp => {
            this.isLoading = false;
        },
          (err: HttpErrorResponse) => this.handleHttpError(err));

      // TODO: Should be reloaded from REST API instead of calculating?
      const tempLevel = this.levels[this.selectedStep + 1];
      tempLevel.order -= 1;

      this.levels[this.selectedStep].order += 1;
      this.levels[this.selectedStep + 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep += 1;
    }
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
          .subscribe(response => {
            this.levels.splice(index, 1);
            this.decreaseOrderOfLevelsFromIndex(index);
            this.changeSelectedStepAfterRemoving(index);
            this.isLoading = false;
            },
            (err: HttpErrorResponse) => this.handleHttpError(err));
      }
    });
  }

  /**
   * Decreases order of levels by one (typically after removing a level) from given index
   * @param {number} index of a level from which onwards should the order be decreased
   */
  private decreaseOrderOfLevelsFromIndex(index: number) {
    for (let i = index; i < this.levels.length; i++) {
      this.levels[i].order--;
    }
  }

  /**
   * Changes selected step to the one before removed or to first one if the first step is removed
   * @param {number} index index of the removed step
   */
  private changeSelectedStepAfterRemoving(index: number) {
    if (index === 0) {
      this.selectedStep = 0;
    } else {
      this.selectedStep--;
    }
  }

  /**
   * Triggered after selection of active level is changes in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    this.selectedStep = event.selectedIndex;
  }

  /**
   * Initializes levels with default values
   */
  private resolveInitialLevels() {
    if (!this.levels) {
      this.levels = [];
    }
  }

  /**
   * Handles http error after request is made
   * @param err http error
   */
  private handleHttpError(err: HttpErrorResponse) {
    this.isLoading = false;
    if (err.status === 404)
      this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach the server right now. Please check your internet connection.')
  }
}


