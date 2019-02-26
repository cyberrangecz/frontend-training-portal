import {Injectable} from "@angular/core";
import {TrainingInstanceDTO} from "../../model/DTOs/training-instance/trainingInstanceDTO";
import {TrainingInstance} from "../../model/training/training-instance";
import {TrainingInstanceCreateDTO} from "../../model/DTOs/training-instance/trainingInstanceCreateDTO";
import {TrainingInstanceUpdateDTO} from "../../model/DTOs/training-instance/trainingInstanceUpdateDTO";
import {TrainingInstanceRestResource} from "../../model/DTOs/training-instance/trainingInstanceRestResource";
import {TrainingDefinitionMapper} from './training-definition-mapper.service';
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingInstanceTableDataModel} from "../../model/table-models/training-instance-table-data-model";
import {TablePagination} from "../../model/table-models/table-pagination";
import {UserMapper} from './user.mapper.service';

@Injectable()
export class TrainingInstanceMapper {

  constructor(private trainingDefinitionMapper: TrainingDefinitionMapper,
              private userMapper: UserMapper) {

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
  mapTrainingInstanceDTOsToTrainingInstancesWithPagination(resource: TrainingInstanceRestResource): TableDataWithPaginationWrapper<TrainingInstanceTableDataModel[]> {
    const tableDataList: TrainingInstanceTableDataModel[] = [];
    resource.content.forEach(dto => {
      const tableRow = new TrainingInstanceTableDataModel();
      tableRow.trainingInstance = this.mapTrainingInstanceDTOToTrainingInstance(dto);
      tableRow.trainingDefinitionTitle = tableRow.trainingInstance.trainingDefinition.title;
      tableDataList.push(tableRow);
    });
    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new TableDataWithPaginationWrapper(tableDataList, tablePagination);
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
    result.organizers = this.userMapper.mapUserRefDTOsToUsers(trainingInstanceDTO.organizers);
    result.accessToken = trainingInstanceDTO.access_token;
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
    result.organizers =  this.userMapper.mapUsersToUserInfoDTOs(trainingInstance.organizers);
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
    result.organizers =  this.userMapper.mapUsersToUserInfoDTOs(trainingInstance.organizers);
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }
}
