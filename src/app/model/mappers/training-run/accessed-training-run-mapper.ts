import {AccessedTrainingRunDTO} from '../../DTOs/training-run/accessed-training-run-dto';
import {TraineeAccessTrainingRunActionEnum} from '../../enums/trainee-access-training-run-actions.enum';
import {AccessedTrainingRun} from '../../table/rows/accessed-training-run';
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;

export class AccessedTrainingRunMapper {

  static fromDTO(dto: AccessedTrainingRunDTO): AccessedTrainingRun {
    const result = new AccessedTrainingRun();
    result.currentLevel = dto.current_level_order;
    result.totalLevels = dto.number_of_levels;
    result.completedLevels = `${result.currentLevel}/${result.totalLevels}`;
    result.trainingInstanceTitle = dto.title;
    result.trainingRunId = dto.id;
    result.trainingInstanceStartTime = new Date(dto.training_instance_start_date);
    result.trainingInstanceEndTime = new Date(dto.training_instance_end_date);
    result.trainingInstanceFormattedDuration =
      `${this.extractDate(result.trainingInstanceStartTime.toString())} -
         ${this.extractDate(result.trainingInstanceEndTime.toString())}`;
    result.action = this.resolvePossibleAction(dto.possible_action);
    return result;
  }

  static fromDTOs(dtos: AccessedTrainingRunDTO[]): AccessedTrainingRun[] {
    return dtos.map(dto => AccessedTrainingRunMapper.fromDTO(dto));
  }

  private static extractDate(date: string): string {
    const duration = (date.match(/[a-zA-Z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}/g))[0];
    const len = 2;
    return `${duration.split(' ')[1]} ${duration.split(' ')[0]} ${duration.split(' ').slice(len).join(' ')}`;
  }

  private static resolvePossibleAction(action: PossibleActionEnum): TraineeAccessTrainingRunActionEnum {
    switch (action) {
      case PossibleActionEnum.RESULTS: return TraineeAccessTrainingRunActionEnum.Results;
      case PossibleActionEnum.RESUME: return  TraineeAccessTrainingRunActionEnum.Resume;
      case PossibleActionEnum.NONE: return TraineeAccessTrainingRunActionEnum.None;
      default: {
        console.error(`Unsupported possible action of training run:${action}`);
        return undefined;
      }
    }
  }
}
