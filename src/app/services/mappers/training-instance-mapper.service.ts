import {Injectable} from '@angular/core';
import {TrainingInstanceCreateDTO} from '../../model/DTOs/training-instance/training-instance-create-dto';
import {TrainingInstanceDTO} from '../../model/DTOs/training-instance/training-instance-dto';
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/training-instance-rest-resource';
import {TrainingInstanceUpdateDTO} from '../../model/DTOs/training-instance/training-instance-update-dto';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingInstanceTableRow} from '../../model/table-adapters/training-instance-table-row';
import {TrainingInstance} from '../../model/training/training-instance';
import {TrainingDefinitionMapper} from './training-definition-mapper.service';

@Injectable()
/**
 * Maps DTOs to training instance model
 */
export class TrainingInstanceMapper {

  constructor(private trainingDefinitionMapper: TrainingDefinitionMapper) {
  }

  /**
   * Maps training instance dtos received from remote server to training instance objects
   * @param resource array of training instance dtos received from remote server
   */
  mapTrainingInstanceDTOsToTrainingInstances(resource: TrainingInstanceRestResource): TrainingInstance[] {
    const result: TrainingInstance[] = [];
    resource.content.forEach(dto => result.push(this.mapTrainingInstanceDTOToTrainingInstance(dto)));
    return result;
  }

  /**
   * Maps training instance dtos received from remote server to training instance objects
   * @param resource array of training instance dtos received from remote server with pagination
   */
  mapTrainingInstanceDTOsToTrainingInstancesWithPagination(resource: TrainingInstanceRestResource)
    : PaginatedResource<TrainingInstanceTableRow[]> {
    const tableDataList = resource.content.map(dto => new TrainingInstanceTableRow(this.mapTrainingInstanceDTOToTrainingInstance(dto)));
    const tablePagination = new Kypo2Pagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(tableDataList, tablePagination);
  }

  /**
   * Maps training instance dto received from remote server to training instance object
   * @param trainingInstanceDTO training instance dto received from remote server
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
    if (trainingInstanceDTO.sandboxes_with_training_run) {
      result.sandboxWithTrainingRunIds = trainingInstanceDTO.sandboxes_with_training_run;
    }
    return result;
  }

  /**
   * Maps training instance object to training instance create dto used to create new resource on the remote server
   * @param trainingInstance training instance object which should be created
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
   * Maps training instance object to training instance update dto used to update existing resource on the remote server
   * @param trainingInstance training instance object which should be updated
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
