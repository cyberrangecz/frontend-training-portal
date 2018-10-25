import {Injectable} from "@angular/core";
import {TrainingDefinitionDTO} from "../../model/DTOs/trainingDefinitionDTO";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {BasicLevelInfoDTO} from "../../model/DTOs/basicLevelInfoDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {InfoLevel} from "../../model/level/info-level";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import LevelTypeEnum = BasicLevelInfoDTO.LevelTypeEnum;
import {TrainingDefinitionCreateDTO} from "../../model/DTOs/trainingDefinitionCreateDTO";
import {TrainingDefinitionUpdateDTO} from "../../model/DTOs/trainingDefinitionUpdateDTO";

@Injectable()
export class TrainingDefinitionMapperService {
  /**
   * Maps training definition DTOs retrieved from the server to internal training definition objects
   * @param trainingDefinitionDTOs training definition DTOs retrieved from server
   */
  mapTrainingDefinitionDTOsToTrainingDefinitions(trainingDefinitionDTOs: TrainingDefinitionDTO[]): TrainingDefinition[] {
    const result: TrainingDefinition[] = [];
    trainingDefinitionDTOs.forEach(trainingDTO => {
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
    result.sandboxDefinitionId = trainingDefinitionDTO.sandBoxDefinitionRefDto.id;
    result.title = trainingDefinitionDTO.title;
    result.description = trainingDefinitionDTO.description;
    result.authorIds = trainingDefinitionDTO.authorRefDto.map(author => author.id);
    result.prerequisites =  trainingDefinitionDTO.prerequisities;
    result.outcomes = trainingDefinitionDTO.outcomes;
    result.state = TrainingDefinitionStateEnum[trainingDefinitionDTO.state];
    result.levels = trainingDefinitionDTO.basicLevelInfoDtos.map(level => this.createLevelFromBasicInfo(level));
    result.startingLevel = trainingDefinitionDTO.startingLevel;
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionCreate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionCreateDTO {
    const result: TrainingDefinitionCreateDTO = new TrainingDefinitionCreateDTO();
    result.description = trainingDefinition.description;
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
    result.startingLevel = trainingDefinition.startingLevel instanceof AbstractLevel ?
      trainingDefinition.startingLevel.id
      : trainingDefinition.startingLevel;
    result.state = TrainingDefinitionCreateDTO.StateEnum[trainingDefinition.state];
    result.title = trainingDefinition.title;
    return result;
  }

  /**
   * Maps internal training definition object to TrainingDefinitionUpdate DTO object used in communication with REST API
   * @param trainingDefinition training definition object from which will the DTO be created
   */
  mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result: TrainingDefinitionUpdateDTO = new TrainingDefinitionUpdateDTO();
    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.outcomes = trainingDefinition.outcomes;
    result.prerequisities = trainingDefinition.prerequisites;
    result.startingLevel = trainingDefinition.startingLevel instanceof AbstractLevel ?
      trainingDefinition.startingLevel.id
      : trainingDefinition.startingLevel;
    result.state = TrainingDefinitionUpdateDTO.StateEnum[trainingDefinition.state];
    result.title = trainingDefinition.title;
    return result;
  }

  private createLevelFromBasicInfo(levelBasicInfoDTO: BasicLevelInfoDTO ): AbstractLevel {
    const result = this.createLevelByType(levelBasicInfoDTO.levelType);
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
