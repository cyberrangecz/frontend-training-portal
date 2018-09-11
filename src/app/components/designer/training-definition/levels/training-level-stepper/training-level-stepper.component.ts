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
    this.levels.push(new InfoLevel(this.trainingDefinitionId,
      "New Info Level",
      0,
      this.levels.length + 1,
      '',
      '',
      ''));
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.levels.push(new GameLevel(this.trainingDefinitionId,
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
      true)
      );
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
    this.levels.push(new AssessmentLevel(this.trainingDefinitionId,
      "New Assessment Level",
      0,
      this.levels.length + 1,
      '',
      '',
      null,
      AssessmentTypeEnum.Questionnaire)
    );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the left)
   */
  swapLeft() {
    if (this.checkIfCanBeSwapped()) {
      if (this.selectedStep !== 0) {
        this.trainingDefinitionSetter.swapLeft(this.trainingDefinitionId, this.levels[this.selectedStep].id);

        // TODO: Should be reloaded from REST API instead of calculating?
        const tempLevel = this.levels[this.selectedStep - 1];
        tempLevel.order += 1;

        this.levels[this.selectedStep].order -= 1;
        this.levels[this.selectedStep - 1] = this.levels[this.selectedStep];
        this.levels[this.selectedStep] = tempLevel;
        this.selectedStep -= 1;

      }
    }
  }
  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    if (this.checkIfCanBeSwapped()) {
      if (this.selectedStep !== this.levels.length - 1) {
        this.trainingDefinitionSetter.swapRight(this.trainingDefinitionId, this.levels[this.selectedStep].id);

        // TODO: Should be reloaded from REST API instead of calculating?
        const tempLevel = this.levels[this.selectedStep + 1];
        tempLevel.order -= 1;

        this.levels[this.selectedStep].order += 1;
        this.levels[this.selectedStep + 1] = this.levels[this.selectedStep];
        this.levels[this.selectedStep] = tempLevel;
        this.selectedStep += 1;
        // TODO: save edited order in db
      }
    }
  }

  /**
   * Checks whether level order can be saved (only if all levels are saved)
   */
  checkIfCanBeSwapped(): boolean {
    const unsavedLevels = this.getCanDeactivateLevels().filter(level => !level.canBeDeactivated);
    if (unsavedLevels.length === 0) {
      return true;
    } else {
      this.alertService.emitAlert(AlertTypeEnum.Warning, 'Please save following levels before changing the order: ' + unsavedLevels.map(level => level.order));
      return false;
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
        this.levels.splice(index, 1);
        this.decreaseOrderOfLevelsFromIndex(index);
        // TODO: save changes in the db
        this.changeSelectedStepAfterRemoving(index);
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
}


