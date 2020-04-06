import {StepItem, StepperItemState} from 'kypo2-stepper';
import {Level} from 'kypo-training-model';
import {AbstractLevelTypeEnum} from 'kypo-training-model';

export class LevelStepperAdapter implements StepItem {
  id: number;
  title: string;
  level: Level;
  primaryIcon: string;
  isActive: boolean;
  state: StepperItemState;

  constructor(level: Level) {
    this.id = level.id;
    this.title = level.title;
    this.level = level;
    this.isActive = false;
    this.state = new StepperItemState();
    this.state.hasState = false;
    this.primaryIcon = this.getLevelIcon(level);
  }

  private getLevelIcon(level: Level): string {
    switch (level.type) {
      case AbstractLevelTypeEnum.Assessment:
        return 'assignment';
      case AbstractLevelTypeEnum.Game:
        return 'videogame_asset';
      case AbstractLevelTypeEnum.Info:
        return 'info';
      default: {
        this.primaryIcon = 'help';
      }
    }
  }
}
