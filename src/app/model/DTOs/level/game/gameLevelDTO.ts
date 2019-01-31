
import {HintDTO} from "./hintDTO";
import {AbstractLevelDTO} from "../abstractLevelDTO";

export interface GameLevelDTO extends AbstractLevelDTO {
  attachments: string[];
  content: string;
  estimated_duration: number;
  flag: string;
  hints: HintDTO[];
  incorrect_flag_limit: number;
  level_type: AbstractLevelDTO.LevelTypeEnum;
  solution: string;
  solution_penalized: boolean;
}
