import {AbstractLevelDTO} from '../abstract-level-dto';
import {HintDTO} from './hint-dto';

export interface GameLevelUpdateDTO {
  id: number;
  max_score?: number;
  content?: string;
  estimated_duration?: number;
  flag?: string;
  hints?: Array<HintDTO>;
  incorrect_flag_limit?: number;
  solution?: string;
  solution_penalized?: boolean;
}

export class GameLevelUpdateDTOClass implements GameLevelUpdateDTO {
  content: string;
  estimated_duration: number;
  flag: string;
  hints: Array<HintDTO>;
  id: number;
  incorrect_flag_limit: number;
  level_type: AbstractLevelDTO.LevelTypeEnum;
  max_score: number;
  solution: string;
  solution_penalized: boolean;
  title: string;
}
