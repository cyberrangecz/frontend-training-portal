import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {BasicLevelInfoDTO} from "../../model/DTOs/basicLevelInfoDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {InfoLevel} from "../../model/level/info-level";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import LevelTypeEnum = BasicLevelInfoDTO.LevelTypeEnum;
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
    result.state = TrainingDefinitionStateEnum[trainingDefinitionDTO.state];
    result.levels = this.getLevelsFromDTO(trainingDefinitionDTO);
    result.startingLevel = trainingDefinitionDTO.starting_level;
    console.log("TRAINING DEF DTO");
    console.log(trainingDefinitionDTO);
    console.log("MAPPED TRAINING DEF");
    console.log(result);
    return result;
  }

  private getSandboxDefinitionIdFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): number {
    return trainingDefinitionDTO.sand_box_definition_ref ? trainingDefinitionDTO.sand_box_definition_ref.id : undefined;
  }

  private getAuthorRefDtoFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): number[] {
    let result = [];
    console.log(trainingDefinitionDTO);
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
    result.description = trainingDefinition.description;
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
/*    result.startingLevel = trainingDefinition.startingLevel instanceof AbstractLevel ?
      trainingDefinition.startingLevel.id
      : trainingDefinition.startingLevel;*/
    result.state = TrainingDefinitionCreateDTO.StateEnum[trainingDefinition.state];
    result.title = trainingDefinition.title;
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
}
