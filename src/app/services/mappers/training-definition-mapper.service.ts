import {Injectable} from '@angular/core';
import {TrainingDefinition} from '../../model/training/training-definition';
import {TrainingDefinitionStateEnum} from '../../model/enums/training-definition-state.enum';
import {AbstractLevel} from '../../model/level/abstract-level';
import {TrainingDefinitionCreateDTO} from '../../model/DTOs/training-definition/training-definition-create-dto';
import {TrainingDefinitionUpdateDTO} from '../../model/DTOs/training-definition/training-definition-update-dto';
import {TrainingDefinitionRestResource} from '../../model/DTOs/training-definition/training-definition-rest-resource';
import {TrainingDefinitionDTO} from '../../model/DTOs/training-definition/training-definition-dto';
import {PaginatedTable} from '../../model/table-adapters/paginated-table';
import {TrainingDefinitionTableAdapter} from '../../model/table-adapters/training-definition-table-adapter';
import {TablePagination} from '../../model/table-adapters/table-pagination';
import {LevelMapper} from './level-mapper.service';
import {BetaTestingGroupDTO} from '../../model/DTOs/training-definition/beta-testing-group-dto';
import {BetaTestingGroupCreateDTO} from '../../model/DTOs/training-definition/beta-testing-group-create-dto';
import {BetaTestingGroupUpdateDTO} from '../../model/DTOs/training-definition/beta-testing-group-update-dto';
import {UserMapper} from './user.mapper.service';
import {TrainingDefinitionInfo} from '../../model/training/training-definition-info';
import {TrainingDefinitionInfoDTO} from '../../model/DTOs/training-definition/training-definition-info-dto';
import {TrainingDefinitionInfoRestResource} from '../../model/DTOs/training-definition/training-definition-info-rest-resource';
import {BetaTestingGroup} from '../../model/training/beta-testing-group';

@Injectable()
export class TrainingDefinitionMapper {

  constructor(private levelMapper: LevelMapper,
              private userMapper: UserMapper) {
  }

  /**
   * Maps training definition DTOs retrieved from the server to internal training definition objects
   * @param resource training definition DTOs retrieved from server
   */
  mapTrainingDefinitionDTOsToTrainingDefinitions(resource: TrainingDefinitionRestResource): TrainingDefinition[] {
    const result: TrainingDefinition[] = [];
    resource.content.forEach((trainingDTO: TrainingDefinitionDTO) => {
      result.push(this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO, false));
    });
    return result;
  }

  mapTrainingDefinitionDTOsToTrainingDefinitionsWithPagination(resource: TrainingDefinitionRestResource): PaginatedTable<TrainingDefinitionTableAdapter[]> {
    const tableData: TrainingDefinitionTableAdapter[] = [];
    resource.content.forEach((trainingDTO: TrainingDefinitionDTO) => {
      const rowData = new TrainingDefinitionTableAdapter();
      rowData.trainingDefinition = this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO, false);
      rowData.selectedState = rowData.trainingDefinition.state;
      rowData.createPossibleStates();
      tableData.push(rowData);
    });
    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedTable(tableData, tablePagination);
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
    result.authors = this.userMapper.mapUserRefDTOsToUsers(trainingDefinitionDTO.authors);
    result.prerequisites =  trainingDefinitionDTO.prerequisities;
    result.outcomes = trainingDefinitionDTO.outcomes;
    result.state = this.mapTrainingDefDTOStateToEnum(trainingDefinitionDTO.state);
    result.lastEditTime = trainingDefinitionDTO.last_edited;
    result.estimatedDuration = trainingDefinitionDTO.estimated_duration;
    result.showStepperBar = trainingDefinitionDTO.show_stepper_bar;
    if (trainingDefinitionDTO.beta_testing_group) {
      result.betaTestingGroup = this.getBetaTestingGroupFromDTO(trainingDefinitionDTO.beta_testing_group);
    }
    if (withLevels) {
      result.levels = this.getLevelsFromDTO(trainingDefinitionDTO);
    }
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionCreate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionCreateDTO {
    const result = new TrainingDefinitionCreateDTO();
    result.outcomes = [];
    result.prerequisities = [];

    result.description = trainingDefinition.description;
    trainingDefinition.outcomes.forEach(outcome => result.outcomes.push(outcome));
    trainingDefinition.prerequisites.forEach(prerequisite => result.prerequisities.push(prerequisite));
    result.state = TrainingDefinitionDTO.StateEnum.UNRELEASED;
    result.title = trainingDefinition.title;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    result.authors_login = trainingDefinition.authors.map(author => author.login);
    result.beta_testing_group = this.createBetaTestingGroupCreateDTO(trainingDefinition.betaTestingGroup);
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionUpdate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result = new TrainingDefinitionUpdateDTO();
    result.outcomes = [];
    result.prerequisities = [];

    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    trainingDefinition.outcomes.forEach(outcome => result.outcomes.push(outcome));
    trainingDefinition.prerequisites.forEach(prerequisite => result.prerequisities.push(prerequisite));
    result.authors_login = trainingDefinition.authors.map(author => author.login);
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.beta_testing_group = this.createBetaTestingGroupUpdateDTO(trainingDefinition.betaTestingGroup);
    return result;
  }

  mapTrainingDefinitionsInfoDTOsToTrainingDefinitionsInfo(dtos: TrainingDefinitionInfoRestResource): TrainingDefinitionInfo[] {
    return dtos.content.map(dto => this.mapTrainingDefinitionInfoDTOToTrainingDefinitionInfo(dto));
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


  private getBetaTestingGroupFromDTO(betaTestingGroupDTO: BetaTestingGroupDTO): BetaTestingGroup {
    const result = new BetaTestingGroup();
    result.organizers = this.userMapper.mapUserRefDTOsToUsers(betaTestingGroupDTO.organizers);
    return result;
  }


  private createBetaTestingGroupCreateDTO(betaTestingGroup: BetaTestingGroup): BetaTestingGroupCreateDTO {
    if (betaTestingGroup) {
      const result = new BetaTestingGroupCreateDTO();
      result.organizers_login = betaTestingGroup.organizers.map(organizer => organizer.login);
      return result;
    }
    return null;
  }

  private createBetaTestingGroupUpdateDTO(betaTestingGroup: BetaTestingGroup): BetaTestingGroupUpdateDTO {
    if (betaTestingGroup) {
      const result = new BetaTestingGroupUpdateDTO();
      result.organizers_login =  betaTestingGroup.organizers.map(organizer => organizer.login);
      return result;
    }
    return null;
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
    switch(state) {
      case TrainingDefinitionStateEnum.Unreleased: return TrainingDefinitionDTO.StateEnum.UNRELEASED;
      case TrainingDefinitionStateEnum.Released: return TrainingDefinitionDTO.StateEnum.RELEASED;
      case TrainingDefinitionStateEnum.Archived: return TrainingDefinitionDTO.StateEnum.ARCHIVED;
      default: {
        console.error('Attribute "state" of TrainingDefinition does not match any of the TrainingDefinitionDTO states');
      }
    }
  }
}
