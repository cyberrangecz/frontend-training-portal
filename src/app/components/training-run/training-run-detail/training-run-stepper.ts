import {AbstractLevelTypeEnum} from '../../../model/enums/abstract-level-type.enum';
import {AbstractLevel} from '../../../model/level/abstract-level';
import {AbstractStepItem, StepperInterface} from 'kypo2-stepper';

/**
 * Training run levels adapter to kypo stepper component
 */
export class TrainingRunStepper {
// TODO: refactor

  activeLevel: number;
  isLoading: boolean;

  abstractLevels: AbstractLevel[];
  items: AbstractStepItem[] = [];
  levels: StepperInterface<AbstractLevel> = {items: this.items as AbstractLevel[], isLocalChange: true, isLoading: this.isLoading};

  constructor(levels: AbstractLevel[], isLoading: boolean, activeLevel: number) {
    this.abstractLevels = levels;
    this.isLoading = isLoading;
    if (activeLevel || activeLevel === 0) {
      this.activeLevel = activeLevel;
      this.markCompletedLevels();
    }
    this.initStepperData();
  }

  /**
   * Marks already completed levels as done if user had previous progress in training run
   */
  private markCompletedLevels() {
    for (let i = 0; i < this.activeLevel; i++) {
      this.abstractLevels[i].isActive = true;
      this.abstractLevels[i].icon = 'done';
    }
  }

  /**
   * Initialize icons for stepper items based on level type and inserts data to stepper
   */
  initStepperData() {
    for (let i = this.activeLevel; i < this.abstractLevels.length; i++) {
      this.abstractLevels[i].isSaved = true;
      switch (this.abstractLevels[i].type) {
        case AbstractLevelTypeEnum.Assessment: {
          this.abstractLevels[i].icon = 'assignment';
          break;
        }
        case AbstractLevelTypeEnum.Game: {
          this.abstractLevels[i].icon = 'videogame_asset';
          break;
        }
        case AbstractLevelTypeEnum.Info: {
          this.abstractLevels[i].icon = 'info';
          break;
        }
      }
    }
    this.items = this.abstractLevels;
    this.levels.items = this.items as AbstractLevel[];
  }
}
