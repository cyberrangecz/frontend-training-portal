import {TrainingInstanceDTO} from '../../DTOs/training-instance/training-instance-dto';
import {TrainingInstanceCreateDTO} from '../../DTOs/training-instance/training-instance-create-dto';
import {TrainingInstanceUpdateDTO} from '../../DTOs/training-instance/training-instance-update-dto';
import {TrainingInstance} from '../../training/training-instance';
import {TrainingDefinitionMapper} from '../training-definition/training-definition-mapper';

export class TrainingInstanceMapper {

  static fromDTO(dto: TrainingInstanceDTO): TrainingInstance {
    const result = new TrainingInstance();
    result.id = dto.id;
    result.trainingDefinition = TrainingDefinitionMapper.fromDTO(dto.training_definition, false);
    result.startTime = new Date(dto.start_time);
    result.endTime = new Date(dto.end_time);
    result.title = dto.title;
    result.accessToken = dto.access_token;
    result.poolId = dto.pool_id;
    return result;
  }

  static fromDTOs(dtos: TrainingInstanceDTO[]): TrainingInstance[] {
    return dtos.map(dto => TrainingInstanceMapper.fromDTO(dto));
  }

  static toCreateDTO(trainingInstance: TrainingInstance): TrainingInstanceCreateDTO {
    const result = new TrainingInstanceCreateDTO();
    result.title = trainingInstance.title;
    result.start_time = trainingInstance.startTime.toISOString();
    result.end_time = trainingInstance.endTime.toISOString();
    result.access_token = trainingInstance.accessToken;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }

  static toUpdateDTO(trainingInstance: TrainingInstance): TrainingInstanceUpdateDTO {
    const result = new TrainingInstanceUpdateDTO();
    result.id = trainingInstance.id;
    result.title = trainingInstance.title;
    result.start_time = trainingInstance.startTime.toISOString();
    result.end_time = trainingInstance.endTime.toISOString();
    result.access_token = trainingInstance.accessToken;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }
}
