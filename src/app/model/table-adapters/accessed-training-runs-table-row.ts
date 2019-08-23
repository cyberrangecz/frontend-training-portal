import {TraineeAccessTrainingRunActionEnum} from '../enums/trainee-access-training-run-actions.enum';
import {TableRowAdapter} from './table-row-adapter';
import {AccessedTrainingRunDTO} from '../DTOs/training-run/accessed-training-run-dto';
import {StringNormalizer} from '../utils/ignore-diacritics-filter';
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;

export class AccessedTrainingRunsTableRow implements TableRowAdapter {
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  normalizedTrainingInstanceTitle: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;


  constructor(dto: AccessedTrainingRunDTO) {
    this.currentLevel = dto.current_level_order;
    this.totalLevels = dto.number_of_levels;
    this.trainingInstanceTitle = dto.title;
    this.trainingRunId = dto.id;
    this.trainingInstanceStartTime = new Date(dto.training_instance_start_date);
    this.trainingInstanceEndTime = new Date(dto.training_instance_end_date);
    this.action = this.getPossibleActionFromDTO(dto.possible_action);
    this.normalizedTrainingInstanceTitle = StringNormalizer.normalizeDiacritics(this.trainingInstanceTitle).toLowerCase()
  }

  private getPossibleActionFromDTO(action: PossibleActionEnum): TraineeAccessTrainingRunActionEnum {
    switch (action) {
      case PossibleActionEnum.RESULTS: return TraineeAccessTrainingRunActionEnum.Results;
      case PossibleActionEnum.RESUME: return  TraineeAccessTrainingRunActionEnum.Resume;
      case PossibleActionEnum.NONE: return TraineeAccessTrainingRunActionEnum.None;
      default: console.error('Could not map attribute "action" of "AccessedTrainingRunDTO to any known action');
    }
  }
}
