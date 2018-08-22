import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {GameLevel} from "../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {AssessmentTypeEnum} from "../../../../enums/assessment-type.enum";
import {LevelConfigurationComponent} from "../level-configuration/level-configuration.component";

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

  constructor() {
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
  canDeactivate(): { canDeactivate: boolean, order: number }[] {
    const levels = [];
    this.levelConfigurationComponents.forEach(levelComponent => {
      const levelCanDeactivate = levelComponent.level.id !== undefined && levelComponent.canDeactivate(); // if level does not have id it is a new level and has not been saved yet
      levels.push(
        {
          canDeactivate: levelCanDeactivate,
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
    if (this.selectedStep !== 0) {
      const tempLevel = this.levels[this.selectedStep - 1];
      tempLevel.order += 1;

      this.levels[this.selectedStep].order -= 1;
      this.levels[this.selectedStep - 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep -= 1;
      // TODO: save edited order in db
    }
  }
  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    if (this.selectedStep !== this.levels.length - 1) {
      const tempLevel = this.levels[this.selectedStep + 1];
      tempLevel.order -= 1;

      this.levels[this.selectedStep].order += 1;
      this.levels[this.selectedStep + 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep += 1;
      // TODO: save edited order in db
    }
  }

  /**
   * Deletes level on given index
   * @param {number} index index of level which should be deleted
   */
  deleteLevel(index: number) {
    this.levels.splice(index, 1);
    this.decreaseOrderOfLevelsFromIndex(index);
    // TODO: save changes in the db
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


