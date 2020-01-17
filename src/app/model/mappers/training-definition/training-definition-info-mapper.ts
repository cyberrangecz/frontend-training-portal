import {TrainingDefinitionInfoDTO} from '../../DTOs/training-definition/training-definition-info-dto';
import {TrainingDefinitionInfo} from '../../training/training-definition-info';
import {TrainingDefinitionMapper} from './training-definition-mapper';

export class TrainingDefinitionInfoMapper {

  static fromDTO(dto: TrainingDefinitionInfoDTO): TrainingDefinitionInfo {
    const result = new TrainingDefinitionInfo();
    result.id = dto.id;
    result.title = dto.title;
    result.state = TrainingDefinitionMapper.stateFromDTO(dto.state);
    return result;
  }

  static fromDTOs(dtos: TrainingDefinitionInfoDTO[]): TrainingDefinitionInfo[] {
    return dtos.map(dto => TrainingDefinitionInfoMapper.fromDTO(dto));
  }
}
