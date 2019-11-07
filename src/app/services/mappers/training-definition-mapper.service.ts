import {Injectable} from '@angular/core';
import {TrainingDefinitionCreateDTO} from '../../model/DTOs/training-definition/training-definition-create-dto';
import {TrainingDefinitionDTO} from '../../model/DTOs/training-definition/training-definition-dto';
import {TrainingDefinitionInfoDTO} from '../../model/DTOs/training-definition/training-definition-info-dto';
import {TrainingDefinitionInfoRestResource} from '../../model/DTOs/training-definition/training-definition-info-rest-resource';
import {TrainingDefinitionRestResource} from '../../model/DTOs/training-definition/training-definition-rest-resource';
import {TrainingDefinitionUpdateDTO} from '../../model/DTOs/training-definition/training-definition-update-dto';
import {TrainingDefinitionStateEnum} from '../../model/enums/training-definition-state.enum';
import {AbstractLevel} from '../../model/level/abstract-level';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingDefinitionTableRow} from '../../model/table-adapters/training-definition-table-row';
import {TrainingDefinition} from '../../model/training/training-definition';
import {TrainingDefinitionInfo} from '../../model/training/training-definition-info';
import {LevelMapper} from './level-mapper.service';

@Injectable()
/**
 * Maps DTOs to Training Definition model
 */
export class TrainingDefinitionMapper {

  constructor(private levelMapper: LevelMapper) {
  }

  /**
   * Maps training definition DTOs retrieved from the server to internal training definition objects
   * @param resource training definition DTOs retrieved from server
   */
  mapTrainingDefinitionDTOsToTrainingDefinitions(resource: TrainingDefinitionRestResource): PaginatedResource<TrainingDefinition[]> {
    const elements = resource.content.map(trainingDTO => this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO, false));
    const pagination = new Kypo2Pagination(
      resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(elements, pagination);
  }

  mapTrainingDefinitionDTOsToTrainingDefinitionsPaginated(resource: TrainingDefinitionRestResource)
    : PaginatedResource<TrainingDefinitionTableRow[]> {
    const tableData: TrainingDefinitionTableRow[] = [];
    resource.content.forEach((trainingDTO: TrainingDefinitionDTO) => {
      const td = this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO, false);
      tableData.push(new TrainingDefinitionTableRow(td, td.state));
    });
    const tablePagination = new Kypo2Pagination(
      resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(tableData, tablePagination);
  }

  /**
   * Maps training definition DTO retrieved from the server to internal training definition object
   * @param trainingDefinitionDTO training definition DTO retrieved from server
   * @param withLevels
   */
  mapTrainingDefinitionDTOToTrainingDefinition(trainingDefinitionDTO: TrainingDefinitionDTO, withLevels: boolean): TrainingDefinition {
    const result = new TrainingDefinition();
    result.id = trainingDefinitionDTO.id;
    result.sandboxDefinitionId = trainingDefinitionDTO.sandbox_definition_ref_id;
    result.title = trainingDefinitionDTO.title;
    result.description = trainingDefinitionDTO.description;
    result.prerequisites =  trainingDefinitionDTO.prerequisities ? trainingDefinitionDTO.prerequisities : [];
    result.outcomes = trainingDefinitionDTO.outcomes ? trainingDefinitionDTO.outcomes : [];
    result.state = this.mapTrainingDefDTOStateToEnum(trainingDefinitionDTO.state);
    result.lastEditTime = trainingDefinitionDTO.last_edited;
    result.estimatedDuration = trainingDefinitionDTO.estimated_duration;
    result.showStepperBar = trainingDefinitionDTO.show_stepper_bar;
    if (withLevels) {
      result.levels = this.getLevelsFromDTO(trainingDefinitionDTO).sort((a, b) => a.order - b.order);
    }
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionCreate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionCreateDTO {
    const result = new TrainingDefinitionCreateDTO();

    result.prerequisities = trainingDefinition.prerequisites.filter(prerequisite => prerequisite.length > 1);
    result.outcomes = trainingDefinition.outcomes.filter( outcome => outcome.length > 1);
    result.description = trainingDefinition.description;
    result.state = TrainingDefinitionDTO.StateEnum.UNRELEASED;
    result.title = trainingDefinition.title;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionUpdate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result = new TrainingDefinitionUpdateDTO();

    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    result.prerequisities = trainingDefinition.prerequisites.filter(prerequisite => prerequisite.length > 1);
    result.outcomes = trainingDefinition.outcomes.filter( outcome => outcome.length > 1);
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;

    return result;
  }

  mapTrainingDefinitionsInfoDTOsToTrainingDefinitionsInfo(resource: TrainingDefinitionInfoRestResource): PaginatedResource<TrainingDefinitionInfo[]> {
    const elements = resource.content.map(dto => this.mapTrainingDefinitionInfoDTOToTrainingDefinitionInfo(dto));
    const pagination = new Kypo2Pagination(
      resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(elements, pagination);
  }

  mapTrainingDefinitionInfoDTOToTrainingDefinitionInfo(dto: TrainingDefinitionInfoDTO): TrainingDefinitionInfo {
    const result = new TrainingDefinitionInfo();
    result.id = dto.id;
    result.title = dto.title;
    result.state = this.mapTrainingDefDTOStateToEnum(dto.state);
    return result;
  }

  private getLevelsFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): AbstractLevel[] {
    let levels: AbstractLevel[] = [];
    if (trainingDefinitionDTO.levels) {
      levels = this.levelMapper.mapLevelDTOsToLevels(trainingDefinitionDTO.levels);
    }
    return levels;
  }

  mapTrainingDefDTOStateToEnum(stateDTO: TrainingDefinitionDTO.StateEnum): TrainingDefinitionStateEnum {
    switch (stateDTO) {
      case TrainingDefinitionDTO.StateEnum.ARCHIVED: return TrainingDefinitionStateEnum.Archived;
      case TrainingDefinitionDTO.StateEnum.RELEASED: return TrainingDefinitionStateEnum.Released;
      case TrainingDefinitionDTO.StateEnum.UNRELEASED: return TrainingDefinitionStateEnum.Unreleased;
      default: {
        console.error('Attribute "state" of TrainingDefinitionDTO does not match any of the TrainingDefinition states');
        return undefined;
      }
    }
  }

  mapTrainingDefStateToDTOEnum(state: TrainingDefinitionStateEnum): TrainingDefinitionDTO.StateEnum {
    switch (state) {
      case TrainingDefinitionStateEnum.Unreleased: return TrainingDefinitionDTO.StateEnum.UNRELEASED;
      case TrainingDefinitionStateEnum.Released: return TrainingDefinitionDTO.StateEnum.RELEASED;
      case TrainingDefinitionStateEnum.Archived: return TrainingDefinitionDTO.StateEnum.ARCHIVED;
      default: {
        console.error('Attribute "state" of TrainingDefinition does not match any of the TrainingDefinitionDTO states');
      }
    }
  }
}
