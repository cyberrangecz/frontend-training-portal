
import {HintDTO} from './hint-dto';
import {AbstractLevelDTO} from '../abstract-level-dto';

export interface GameLevelDTO extends AbstractLevelDTO {
  content: string;
  flag: string;
  hints: HintDTO[];
  incorrect_flag_limit: number;
  level_type: AbstractLevelDTO.LevelTypeEnum;
  solution: string;
  solution_penalized: boolean;
}
