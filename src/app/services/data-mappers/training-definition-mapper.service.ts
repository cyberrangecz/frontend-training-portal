import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {BasicLevelInfoDTO} from "../../model/DTOs/basicLevelInfoDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {InfoLevel} from "../../model/level/info-level";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import {
  TrainingDefinitionCreateDTO,
  TrainingDefinitionCreateDTOClass
} from "../../model/DTOs/trainingDefinitionCreateDTO";
import {
  TrainingDefinitionUpdateDTO,
  TrainingDefinitionUpdateDTOClass
} from "../../model/DTOs/trainingDefinitionUpdateDTO";
import {TrainingDefinitionRestResource} from "../../model/DTOs/trainingDefinitionRestResource";
import {TrainingDefinitionDTO} from "../../model/DTOs/trainingDefinitionDTO";
import {AuthorRefDTO} from "../../model/DTOs/authorRefDTO";
import LevelTypeEnum = BasicLevelInfoDTO.LevelTypeEnum;

@Injectable()
export class TrainingDefinitionMapperService {
  /**
   * Maps training definition DTOs retrieved from the server to internal training definition objects
   * @param resource training definition DTOs retrieved from server
   */
  mapTrainingDefinitionDTOsToTrainingDefinitions(resource: TrainingDefinitionRestResource): TrainingDefinition[] {
    const result: TrainingDefinition[] = [];
    resource.content.forEach((trainingDTO: TrainingDefinitionDTO) => {
      result.push(this.mapTrainingDefinitionDTOToTrainingDefinition(trainingDTO));
    });
    return result;
  }

  /**
   * Maps training definition DTO retrieved from the server to internal training definition object
   * @param trainingDefinitionDTO training definition DTO retrieved from server
   */
  mapTrainingDefinitionDTOToTrainingDefinition(trainingDefinitionDTO: TrainingDefinitionDTO): TrainingDefinition {
    const result = new TrainingDefinition();
    result.id = trainingDefinitionDTO.id;
    result.sandboxDefinitionId = this.getSandboxDefinitionIdFromDTO(trainingDefinitionDTO);
    result.title = trainingDefinitionDTO.title;
    result.description = trainingDefinitionDTO.description;
    result.authorIds = this.getAuthorRefDtoFromDTO(trainingDefinitionDTO);
    result.prerequisites =  trainingDefinitionDTO.prerequisities;
    result.outcomes = trainingDefinitionDTO.outcomes;
    result.state = this.mapTrainingDefDTOStateToEnum(trainingDefinitionDTO.state);
    result.levels = this.getLevelsFromDTO(trainingDefinitionDTO);
    result.startingLevel = trainingDefinitionDTO.starting_level;
    console.log(result);
    return result;
  }

  private getSandboxDefinitionIdFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): number {
    return trainingDefinitionDTO.sand_box_definition_ref ? trainingDefinitionDTO.sand_box_definition_ref.id : undefined;
  }

  private getAuthorRefDtoFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): number[] {
    let result = [];
    if (trainingDefinitionDTO.author_ref) {
      result = trainingDefinitionDTO.author_ref.map(author => author.id);
    }
    return result;
  }

  private getLevelsFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): AbstractLevel[] {
    let levels: AbstractLevel[] = [];
    if (trainingDefinitionDTO.basic_level_info_dtos) {
      levels = trainingDefinitionDTO.basic_level_info_dtos
        .map((level: BasicLevelInfoDTO) => this.createLevelFromBasicInfo(level));
    }
    return levels;
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
    result.sandbox_definition_ref = { id: trainingDefinition.sandboxDefinitionId, sandbox_definition_ref: trainingDefinition.sandboxDefinitionId };
    result.show_stepper_bar = trainingDefinition.showProgress;
    result.author_ref = this.mapAuthorsToCreateUpdateTrainingDefDTO(trainingDefinition.authorIds as number[]);
    console.log(result);
    return result;
  }

  private mapAuthorsToCreateUpdateTrainingDefDTO(authorIds: number[]): AuthorRefDTO[] {
    const result: AuthorRefDTO[] = [];
    authorIds.forEach(authorId => result.push({id: authorId, author_ref_login: "No name"}));
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionUpdate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result: TrainingDefinitionUpdateDTO = new TrainingDefinitionUpdateDTOClass();
    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
/*    result.startingLevel = trainingDefinition.startingLevel instanceof AbstractLevel ?
      trainingDefinition.startingLevel.id
      : trainingDefinition.startingLevel;*/
    result.state = TrainingDefinitionUpdateDTO.StateEnum[trainingDefinition.state];
    result.title = trainingDefinition.title;
    return result;
  }

  private createLevelFromBasicInfo(levelBasicInfoDTO: BasicLevelInfoDTO ): AbstractLevel {
    const result = this.createLevelByType(levelBasicInfoDTO.level_type);
    result.id = levelBasicInfoDTO.id;
    result.title = levelBasicInfoDTO.title;
    return result;
  }

  private createLevelByType(levelType: LevelTypeEnum ): AbstractLevel {
    let result: AbstractLevel;
    switch (levelType) {
      case LevelTypeEnum.INFO: {
        result = new InfoLevel();
        result.type = AbstractLevelTypeEnum.Info;
        return result;
      }
      case LevelTypeEnum.ASSESSMENT: {
        result = new AssessmentLevel();
        result.type = AbstractLevelTypeEnum.Assessment;
        return result;
      }
      case LevelTypeEnum.GAME: {
        result = new GameLevel();
        result.type = AbstractLevelTypeEnum.Game;
        return result;
      }
      default: {
        console.error('Level data in wrong format. Level was not created.');
        return null;
      }
    }
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
