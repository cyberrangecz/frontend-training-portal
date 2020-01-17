import {InfoLevelDTO} from '../../../DTOs/level/info/info-level-dto';
import {AbstractLevelTypeEnum} from '../../../enums/abstract-level-type.enum';
import {InfoLevelUpdateDTO, InfoLevelUpdateDTOClass} from '../../../DTOs/level/info/info-level-update-dto';
import {InfoLevel} from '../../../level/info-level';

export class InfoLevelMapper {

  static fromDTO(dto: InfoLevelDTO): InfoLevel {
    const result = new InfoLevel();
    result.type = AbstractLevelTypeEnum.Info;
    result.content = dto.content;
    return result;
  }

  static toUpdateDTO(level: InfoLevel): InfoLevelUpdateDTO {
    const result = new InfoLevelUpdateDTOClass();
    result.id = level.id;
    result.title = level.title;
    result.content = level.content;
    return result;
  }
}
