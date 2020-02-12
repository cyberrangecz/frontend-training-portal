import {AccessTrainingRunDTO} from '../../DTOs/training-run/access-training-run-dto';
import {GameLevel} from '../../level/game-level';
import {AbstractLevelDTO} from '../../DTOs/level/abstract-level-dto';
import {AccessTrainingRunInfo} from '../../training/access-training-run-info';
import {LevelMapper} from '../level/level-mapper';
import LevelTypeEnum = AbstractLevelDTO.LevelTypeEnum;

export class AccessTrainingRunMapper {
  static fromDTO(dto: AccessTrainingRunDTO): AccessTrainingRunInfo {
    const result = new AccessTrainingRunInfo();
    result.trainingRunId = dto.training_run_id;
    result.sandboxInstanceId = dto.sandbox_instance_ref_id;
    result.startTime = new Date(dto.start_time);
    result.isStepperDisplayed = dto.show_stepper_bar;
    result.currentLevel = LevelMapper.fromDTO(dto.abstract_level_dto);
    result.levels = LevelMapper.fromBasicDTOs(dto.info_about_levels);

    if (dto.taken_solution && dto.abstract_level_dto.level_type === LevelTypeEnum.GAME) {
      (result.currentLevel as GameLevel).solution = dto.taken_solution;
    }
    if (dto.taken_hints && dto.taken_hints.length > 0  && dto.abstract_level_dto.level_type === LevelTypeEnum.GAME) {
      dto.taken_hints.forEach(takenHint =>  {
        const matchingHint = (result.currentLevel as GameLevel).hints.find(hint => hint.id === takenHint.id);
        if (matchingHint) {
          matchingHint.content = takenHint.content;
        }
      });
    }
    return result;
  }
}
