import {TrainingRunDTO} from '../../DTOs/training-run/training-run-dto';
import {TrainingRunStateEnum} from '../../enums/training-run-state.enum';
import {TrainingRun} from '../../training/training-run';
import {UserMapper} from '../user/user-mapper';
import {LevelMapper} from '../level/level-mapper';

export class TrainingRunMapper {

  static fromDTOs(dtos: TrainingRunDTO[]): TrainingRun[] {
    return dtos.map(dto => this.fromDTO(dto));
  }

  static fromDTO(dto: TrainingRunDTO): TrainingRun {
    const result = new TrainingRun();
    result.id = dto.id;
    result.trainingDefinitionId = dto.definition_id;
    result.trainingInstanceId = dto.instance_id;
    result.startTime = new Date(dto.start_time);
    result.endTime = new Date(dto.end_time);
    result.eventLogReference = dto.event_log_reference;
    result.sandboxInstanceId = dto.sandbox_instance_ref_id;
    result.player = UserMapper.fromDTO(dto.participant_ref);
    result.state = this.resolveState(dto.state);
    if (result.currentLevel) {
      result.currentLevel = LevelMapper.fromDTO(dto.current_level);
    }
    return result;
  }

  private static resolveState(state: TrainingRunDTO.StateEnum): TrainingRunStateEnum {
    switch (state) {
      case TrainingRunDTO.StateEnum.RUNNING: return TrainingRunStateEnum.RUNNING;
      case TrainingRunDTO.StateEnum.FINISHED: return TrainingRunStateEnum.FINISHED;
      case TrainingRunDTO.StateEnum.ARCHIVED: return TrainingRunStateEnum.ARCHIVED;
      default: {
        console.error(`Unsupported training run state of value: ${state}`);
        return undefined;
      }
    }
  }
}
