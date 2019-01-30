import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {AbstractLevel} from "../../model/level/abstract-level";
import {
  TrainingDefinitionCreateDTO,
  TrainingDefinitionCreateDTOClass
} from "../../model/DTOs/trainingDefinitionCreateDTO";
import {
  TrainingDefinitionUpdateDTO,
  TrainingDefinitionUpdateDTOClass
} from "../../model/DTOs/trainingDefinitionUpdateDTO";
import {TrainingDefinitionRestResource} from "../../model/DTOs/trainingDefinitionRestResource";
import {TrainingDefinitionDTO} from '../../model/DTOs/trainingDefinitionDTO';
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingDefinitionTableDataModel} from "../../model/table-models/training-definition-table-data-model";
import {TablePagination} from "../../model/table-models/table-pagination";
import {LevelMapper} from "./level-mapper.service";
import {ViewGroupDTO} from "../../model/DTOs/viewGroupDTO";
import {ViewGroup} from "../../model/user/view-group";
import {ViewGroupCreateDTO} from "../../model/DTOs/viewGroupCreateDTO";
import {ViewGroupUpdateDTO} from "../../model/DTOs/viewGroupUpdateDTO";

@Injectable()
export class TrainingDefinitionMapper {

  constructor(private levelMapper: LevelMapper) {

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
    result.authors = this.getAuthorsFromDTO(trainingDefinitionDTO);
    result.prerequisites =  trainingDefinitionDTO.prerequisities;
    result.outcomes = trainingDefinitionDTO.outcomes;
    result.state = this.mapTrainingDefDTOStateToEnum(trainingDefinitionDTO.state);
    result.startingLevel = trainingDefinitionDTO.starting_level;
    result.viewGroup = this.getViewGroupFromDTO(trainingDefinitionDTO.viewGroup);
    if (withLevels) {
      result.levels = this.getLevelsFromDTO(trainingDefinitionDTO);
    }
    return result;
  }

  private getAuthorsFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): string[] {
    let result = [];
    if (trainingDefinitionDTO.authors) {
      result = trainingDefinitionDTO.authors.map(author => author.user_ref_login);
    }
    return result;
  }

  private getLevelsFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): AbstractLevel[] {
    let levels: AbstractLevel[] = [];
    if (trainingDefinitionDTO.levels) {
      levels = this.levelMapper.mapLevelDTOsToLevels(trainingDefinitionDTO.levels);
    }
    return levels;
  }


  private getViewGroupFromDTO(viewGroupDTO: ViewGroupDTO): ViewGroup {
    const result = new ViewGroup();
    result.id = viewGroupDTO.id;
    result.title = viewGroupDTO.title;
    result.description = viewGroupDTO.description;
    result.organizers = viewGroupDTO.organizers.map(organizer => organizer.user_ref_login);
    return result;
  }


  /**
   * Maps internal training definition object to TrainingDefinitionCreate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionCreateDTO {
    const result: TrainingDefinitionCreateDTO = new TrainingDefinitionCreateDTOClass();
    result.outcomes = [];
    result.prerequisities = [];

    result.description = trainingDefinition.description;
    trainingDefinition.outcomes.forEach(outcome => result.outcomes.push(outcome));
    trainingDefinition.prerequisites.forEach(prerequisite => result.prerequisities.push(prerequisite));
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    result.show_stepper_bar = trainingDefinition.showProgress;
    result.author_logins = trainingDefinition.authors as string[];
    result.td_view_group = this.createViewGroupCreateDTO(trainingDefinition.viewGroup);
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionUpdate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result: TrainingDefinitionUpdateDTO = new TrainingDefinitionUpdateDTOClass();
    result.outcomes = [];
    result.prerequisities = [];

    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.sandbox_definition_ref_id = trainingDefinition.sandboxDefinitionId;
    trainingDefinition.outcomes.forEach(outcome => result.outcomes.push(outcome));
    trainingDefinition.prerequisites.forEach(prerequisite => result.prerequisities.push(prerequisite));
    result.author_logins = trainingDefinition.authors as string[];
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
    result.state = this.mapTrainingDefStateToDTOEnum(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.td_view_group = this.createViewGroupUpdateDTO(trainingDefinition.viewGroup);
    return result;
  }

  private createViewGroupCreateDTO(viewGroup: ViewGroup): ViewGroupCreateDTO {
    const result = new ViewGroupCreateDTO();
    result.title = viewGroup.title;
    result.description = viewGroup.description;
    result.organizer_logins = viewGroup.organizers as string [];
    return result;
  }

  private createViewGroupUpdateDTO(viewGroup: ViewGroup): ViewGroupUpdateDTO {
    const result = new ViewGroupUpdateDTO();
    result.id = viewGroup.id;
    result.title = viewGroup.title;
    result.description = viewGroup.description;
    result.organizer_logins = viewGroup.organizers as string [];
    return result;
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
