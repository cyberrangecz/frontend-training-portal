import {Kypo2Stepper, StepItem} from 'kypo2-stepper';
import {AbstractLevelTypeEnum} from '../../../model/enums/abstract-level-type.enum';
import {AbstractLevel} from '../../../model/level/abstract-level';

/**
 * Training run levels adapter to kypo stepper component
 */
export class TrainingRunStepper {

  activeLevel: number;
  isLoading: boolean;

  abstractLevels: AbstractLevel[];
  items: StepItem[] = [];
  levels: Kypo2Stepper<StepItem> = {items: this.items as AbstractLevel[]};

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
   * Initialize icons for stepper items based on level type and inserts data to stepper
   */
  initStepperData() {
    for (let i = this.activeLevel; i < this.abstractLevels.length; i++) {
      this.abstractLevels[i].state.hasState = false;
      switch (this.abstractLevels[i].type) {
        case AbstractLevelTypeEnum.Assessment: {
          this.abstractLevels[i].primaryIcon = 'assignment';
          break;
        }
        case AbstractLevelTypeEnum.Game: {
          this.abstractLevels[i].primaryIcon = 'videogame_asset';
          break;
        }
        case AbstractLevelTypeEnum.Info: {
          this.abstractLevels[i].primaryIcon = 'info';
          break;
        }
      }
    }
    this.items = this.abstractLevels;
    this.levels.items = this.items as AbstractLevel[];
  }

  /**
   * Marks already completed levels as done if user had previous progress in training run
   */
  private markCompletedLevels() {
    for (let i = 0; i < this.activeLevel; i++) {
      this.abstractLevels[i].state.hasState = true;
      this.abstractLevels[i].state.icon = 'done';
    }
  }
}
