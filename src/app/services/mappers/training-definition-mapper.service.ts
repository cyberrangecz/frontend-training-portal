import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {AbstractLevel} from "../../model/level/abstract-level";
import {TrainingDefinitionCreateDTO} from "../../model/DTOs/training-definition/trainingDefinitionCreateDTO";
import {TrainingDefinitionUpdateDTO} from "../../model/DTOs/training-definition/trainingDefinitionUpdateDTO";
import {TrainingDefinitionRestResource} from "../../model/DTOs/training-definition/trainingDefinitionRestResource";
import {TrainingDefinitionDTO} from '../../model/DTOs/training-definition/trainingDefinitionDTO';
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingDefinitionTableDataModel} from "../../model/table-models/training-definition-table-data-model";
import {TablePagination} from "../../model/table-models/table-pagination";
import {LevelMapper} from "./level-mapper.service";
import {BetaTestingGroupDTO} from "../../model/DTOs/training-definition/betaTestingGroupDTO";
import {BetaTestingGroup} from "../../model/user/beta-testing-group";
import {BetaTestingGroupCreateDTO} from "../../model/DTOs/training-definition/betaTestingGroupCreateDTO";
import {BetaTestingGroupUpdateDTO} from "../../model/DTOs/training-definition/betaTestingGroupUpdateDTO";
import {UserMapper} from './user.mapper.service';

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

  mapTrainingDefinitionDTOsToTrainingDefinitionsWithPagination(resource: TrainingDefinitionRestResource): TableDataWithPaginationWrapper<TrainingDefinitionTableDataModel[]> {
    const tableData: TrainingDefinitionTableDataModel[] = [];
    resource.content.forEach((trainingDTO: TrainingDefinitionDTO) => {
      const rowData = new TrainingDefinitionTableDataModel();
      rowData.trainingDefinition = this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO, false);
      tableData.push(rowData);
    });
    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new TableDataWithPaginationWrapper(tableData, tablePagination);
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
    result.startingLevelId = trainingDefinitionDTO.starting_level;
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
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    result.authors = this.userMapper.mapUsersToUserBasicDTOs(trainingDefinition.authors);
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
    result.authors = this.userMapper.mapUsersToUserBasicDTOs(trainingDefinition.authors);
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.beta_testing_group = this.createBetaTestingGroupUpdateDTO(trainingDefinition.betaTestingGroup);
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
      result.organizers = this.userMapper.mapUsersToUserBasicDTOs(betaTestingGroup.organizers);
      return result;
    }
    return null;
  }

  private createBetaTestingGroupUpdateDTO(betaTestingGroup: BetaTestingGroup): BetaTestingGroupUpdateDTO {
    if (betaTestingGroup) {
      const result = new BetaTestingGroupUpdateDTO();
      result.organizers = this.userMapper.mapUsersToUserBasicDTOs(betaTestingGroup.organizers);
      return result;
    }
    return null;
  }

  private mapTrainingDefDTOStateToEnum(stateDTO: TrainingDefinitionDTO.StateEnum): TrainingDefinitionStateEnum {
    switch (stateDTO) {
      case TrainingDefinitionDTO.StateEnum.ARCHIVED: return TrainingDefinitionStateEnum.Archived;
      case TrainingDefinitionDTO.StateEnum.PRIVATED: return TrainingDefinitionStateEnum.Privated;
      case TrainingDefinitionDTO.StateEnum.RELEASED: return TrainingDefinitionStateEnum.Released;
      case TrainingDefinitionDTO.StateEnum.UNRELEASED: return TrainingDefinitionStateEnum.Unreleased;
      default: {
        console.error('Attribute "state" of TrainingDefinitionDTO does not match any of the TrainingDefinition states');
        return undefined;
      }
    }
  }

  private mapTrainingDefStateToDTOEnum(state: TrainingDefinitionStateEnum): TrainingDefinitionDTO.StateEnum {
    switch(state) {
      case TrainingDefinitionStateEnum.Unreleased: return TrainingDefinitionDTO.StateEnum.UNRELEASED;
      case TrainingDefinitionStateEnum.Released: return TrainingDefinitionDTO.StateEnum.RELEASED;
      case TrainingDefinitionStateEnum.Privated: return TrainingDefinitionDTO.StateEnum.PRIVATED;
      case TrainingDefinitionStateEnum.Archived: return TrainingDefinitionDTO.StateEnum.ARCHIVED;
      default: {
        console.error('Attribute "state" of TrainingDefinition does not match any of the TrainingDefinitionDTO states');
      }
    }
  }


}
