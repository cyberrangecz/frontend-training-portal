import {AbstractLevelDTO} from '../../DTOs/level/abstract-level-dto';
import {GameLevel} from '../../level/game-level';
import {GameLevelDTO} from '../../DTOs/level/game/game-level-dto';
import {InfoLevel} from '../../level/info-level';
import {InfoLevelDTO} from '../../DTOs/level/info/info-level-dto';
import {AssessmentLevel} from '../../level/assessment-level';
import {AssessmentLevelDTO} from '../../DTOs/level/assessment/assessment-level-dto';
import {BasicLevelInfoDTO} from '../../DTOs/level/basic-level-info-dto';
import {Level} from '../../level/level';
import {GameLevelMapper} from './game/game-level-mapper';
import {InfoLevelMapper} from './info/info-level-mapper';
import {AssessmentLevelMapper} from './assessment/assessment-level-mapper';
import {AbstractLevelTypeEnum} from '../../enums/abstract-level-type.enum';

export class LevelMapper {

  static fromDTO(dto: AbstractLevelDTO): Level {
    let level: Level;
    switch (dto.level_type) {
      case AbstractLevelDTO.LevelTypeEnum.GAME: {
        level = GameLevelMapper.fromDTO(dto as GameLevelDTO);
        break;
      }
      case AbstractLevelDTO.LevelTypeEnum.INFO: {
        level = InfoLevelMapper.fromDTO(dto as InfoLevelDTO);
        break;
      }
      case AbstractLevelDTO.LevelTypeEnum.ASSESSMENT: {
        level = AssessmentLevelMapper.fromDTO(dto as AssessmentLevelDTO);
        break;
      }
    }

    level.id = dto.id;
    level.title = dto.title;
    level.order = dto.order;
    level.estimatedDuration = dto.estimated_duration;
    level.maxScore = dto.max_score;
    return level;
  }

  static fromDTOs(dtos: AbstractLevelDTO[]): Level[] {
    return dtos
      .map(dto => LevelMapper.fromDTO(dto))
      .sort((a, b) => a.order - b.order);
  }

  static fromBasicDTO(dto: BasicLevelInfoDTO): Level {
    let level: Level;
    switch (dto.level_type) {
      case BasicLevelInfoDTO.LevelTypeEnum.GAME: {
        level = new GameLevel();
        level.type = AbstractLevelTypeEnum.Game;
        break;
      }
      case BasicLevelInfoDTO.LevelTypeEnum.INFO: {
        level = new InfoLevel();
        level.type = AbstractLevelTypeEnum.Info;
        break;
      }
      case BasicLevelInfoDTO.LevelTypeEnum.ASSESSMENT: {
        level = new AssessmentLevel();
        level.type = AbstractLevelTypeEnum.Assessment;
        break;
      }
    }

    level.id = dto.id;
    level.title = dto.title;
    level.order = dto.order;
    return level;
  }

  static fromBasicDTOs(dtos: BasicLevelInfoDTO[]): Level[] {
    return dtos.map(dto => this.fromBasicDTO(dto));
  }
}
