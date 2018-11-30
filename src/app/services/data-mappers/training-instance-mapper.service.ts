import {Injectable} from "@angular/core";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {TrainingInstance} from "../../model/training/training-instance";
import {TrainingInstanceCreateDTO, TrainingInstanceCreateDTOClass} from "../../model/DTOs/trainingInstanceCreateDTO";
import {TrainingInstanceUpdateDTO, TrainingInstanceUpdateDTOClass} from "../../model/DTOs/trainingInstanceUpdateDTO";
import {TrainingInstanceRestResource} from "../../model/DTOs/trainingInstanceRestResource";
import {TrainingDefinitionMapperService} from './training-definition-mapper.service';
import {TrainingDefinitionDTO} from '../../model/DTOs/trainingDefinitionDTO';
import {UserRefDTO} from '../../model/DTOs/userRefDTO';
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingInstanceTableDataModel} from "../../model/table-models/training-instance-table-data-model";
import {Pagination} from "../../model/DTOs/pagination";
import {TablePagination} from "../../model/table-models/table-pagination";

@Injectable()
export class TrainingInstanceMapperService {

  constructor(private trainingDefinitionMapper: TrainingDefinitionMapperService) {

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
    const pagination: TablePagination = this.mapPaginationDTOToPaginationObject(resource.pagination);
    return new TableDataWithPaginationWrapper(tableDataList, pagination);
  }

  /**
   * Maps training instance dto received from remote server to training instance object
   * @param trainingInstanceDTO training instance dto received from remote server
   */
  mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO: TrainingInstanceDTO): TrainingInstance {
    const result = new TrainingInstance();
    result.id = trainingInstanceDTO.id;
    result.trainingDefinition = this.trainingDefinitionMapper
      .mapTrainingDefinitionDTOToTrainingDefinition(trainingInstanceDTO.training_definition);
    result.startTime = new Date(trainingInstanceDTO.start_time);
    result.endTime = new Date(trainingInstanceDTO.end_time);
    result.title = trainingInstanceDTO.title;
    result.poolSize = trainingInstanceDTO.pool_size;
    result.organizersIds = trainingInstanceDTO.organizers.map(organizer => organizer.id);
    result.keyword = trainingInstanceDTO.password;
    return result;
  }

  /**
   * Maps training instance object to training instance create dto used to create new resource on the remote server
   * @param trainingInstance training instance object which should be created
   */
  mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance: TrainingInstance): TrainingInstanceCreateDTO {
    const result = new TrainingInstanceCreateDTOClass();
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = trainingInstance.startTime.toISOString();
    result.end_time = trainingInstance.endTime.toISOString();
    result.password = trainingInstance.keyword;
    result.org_ids =  trainingInstance.organizersIds;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }

  /**
   * Maps training instance object to training instance update dto used to update existing resource on the remote server
   * @param trainingInstance training instance object which should be updated
   */
  mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance: TrainingInstance): TrainingInstanceUpdateDTO {
    const result = new TrainingInstanceUpdateDTOClass();
    result.id = trainingInstance.id;
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = trainingInstance.startTime.toISOString().split('.')[0];
    result.end_time = trainingInstance.endTime.toISOString().split('.')[0];
    result.password = trainingInstance.keyword;
    result.org_ids =  trainingInstance.organizersIds;
    result.training_definition_id = trainingInstance.trainingDefinition.id;
    return result;
  }


  private mapPaginationDTOToPaginationObject(pagination: Pagination): TablePagination {
    const result: TablePagination = new TablePagination();
    result.size = pagination.size;
    result.totalElements = pagination.total_elements;
    result.numberOfElements = pagination.number_of_elements;
    result.totalPages = pagination.total_pages;
    return result;
  }
}
