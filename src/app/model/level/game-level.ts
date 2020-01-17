import {Level} from './level';
import {Hint} from './hint';
import {GameLevelDTO} from '../DTOs/level/game/game-level-dto';
import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';
import {GameLevelUpdateDTO, GameLevelUpdateDTOClass} from '../DTOs/level/game/game-level-update-dto';

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends Level {

  flag: string;
  hints: Hint[];
  content: string;
  solution: string;
  incorrectFlagLimit = 5;
  solutionPenalized = true;

  constructor() {
    super();
    this.primaryIcon = 'videogame_asset';
    this.hints = [];
  }

  hasSolution(): boolean {
    return this.solution !== null && this.solution !== undefined;
  }
}
