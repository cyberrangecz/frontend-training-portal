import {Injectable} from '@angular/core';
import {TrainingInstanceCreateDTO} from '../../model/DTOs/training-instance/training-instance-create-dto';
import {TrainingInstanceDTO} from '../../model/DTOs/training-instance/training-instance-dto';
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/training-instance-rest-resource';
import {TrainingInstanceUpdateDTO} from '../../model/DTOs/training-instance/training-instance-update-dto';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingInstance} from '../../model/training/training-instance';
import {TrainingDefinitionMapper} from './training-definition-mapper.service';
import {JavaApiPaginationMapper} from './java-api-pagination-mapper';

@Injectable()
/**
 * Maps DTOs on training instance internal model
 */
export class TrainingInstanceMapper {

  constructor(private trainingDefinitionMapper: TrainingDefinitionMapper) {
  }

  /**
   * Maps paginated training instance dtos received on training instance objects
   * @param resource dto to be mapped on internal model
   */
  mapTrainingInstanceDTOsToTrainingInstances(resource: TrainingInstanceRestResource)
    : PaginatedResource<TrainingInstance[]> {
    const elements = resource.content.map(dto => this.mapTrainingInstanceDTOToTrainingInstance(dto));
    const pagination = JavaApiPaginationMapper.map(resource.pagination);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps training instance dto received fon training instance object
   * @param trainingInstanceDTO dto to be mapped on internal model
   */
  mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO: TrainingInstanceDTO): TrainingInstance {
    const result = new TrainingInstance();
    result.id = trainingInstanceDTO.id;
    result.trainingDefinition = this.trainingDefinitionMapper
      .mapTrainingDefinitionDTOToTrainingDefinition(trainingInstanceDTO.training_definition, false);
    result.startTime = new Date(trainingInstanceDTO.start_time);
    result.endTime = new Date(trainingInstanceDTO.end_time);
    result.title = trainingInstanceDTO.title;
    result.poolSize = trainingInstanceDTO.pool_size;
    result.accessToken = trainingInstanceDTO.access_token;
    result.poolId = trainingInstanceDTO.pool_id;
    return result;
  }

  /**
   * Maps training instance on training instance create dto
   * @param trainingInstance training instance object which should be mapped
   */
  mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance: TrainingInstance): TrainingInstanceCreateDTO {
    const result = new TrainingInstanceCreateDTO();
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = trainingInstance.startTime.toISOString();
    result.end_time = trainingInstance.endTime.toISOString();
    result.access_token = trainingInstance.accessToken;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }

  /**
   * Maps training instance on training instance update dto
   * @param trainingInstance training instance object which should be mapped
   */
  mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance: TrainingInstance): TrainingInstanceUpdateDTO {
    const result = new TrainingInstanceUpdateDTO();
    result.id = trainingInstance.id;
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = trainingInstance.startTime.toISOString();
    result.end_time = trainingInstance.endTime.toISOString();
    result.access_token = trainingInstance.accessToken;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }
}
