import {GameLevelDTO} from '../../../DTOs/level/game/game-level-dto';
import {AbstractLevelTypeEnum} from '../../../enums/abstract-level-type.enum';
import {GameLevelUpdateDTO, GameLevelUpdateDTOClass} from '../../../DTOs/level/game/game-level-update-dto';
import {GameLevel} from '../../../level/game-level';
import {HintMapper} from './hint-mapper';

export class GameLevelMapper {

  static fromDTO(dto: GameLevelDTO): GameLevel {
    const result = new GameLevel();
    result.hints = HintMapper.fromDTOs(dto.hints);
    result.type = AbstractLevelTypeEnum.Game;
    result.flag = dto.flag;
    result.content = dto.content;
    result.solution = dto.solution;
    result.incorrectFlagLimit = dto.incorrect_flag_limit;
    result.solutionPenalized = dto.solution_penalized;
    return result;
  }

  static toUpdateDTO(gameLevel: GameLevel): GameLevelUpdateDTO {
    const result = new GameLevelUpdateDTOClass();
    result.id = gameLevel.id;
    result.title = gameLevel.title;
    result.max_score = gameLevel.maxScore;
    result.content = gameLevel.content;
    result.estimated_duration = gameLevel.estimatedDuration;
    result.flag = gameLevel.flag;
    result.incorrect_flag_limit = gameLevel.incorrectFlagLimit;
    result.solution = gameLevel.solution;
    result.solution_penalized = gameLevel.solutionPenalized;
    result.hints = HintMapper.toDTOs(gameLevel.hints);
    return result;
  }
}
