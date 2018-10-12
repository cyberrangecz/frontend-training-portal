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

@Injectable()
export class TrainingDefinitionFactoryService {

  createTrainingDefinitionFromDTOs(trainingDefinitionDTOs: TrainingDefinitionDTO[]): TrainingDefinition[] {
    const result: TrainingDefinition[] = [];
    trainingDefinitionDTOs.forEach(trainingDTO => {
      result.push(this.createTrainingDefinitionFromDTO(trainingDTO));
    });
    return result;
  }

  createTrainingDefinitionFromDTO(trainingDefinitionDTO: TrainingDefinitionDTO): TrainingDefinition {
    const result = new TrainingDefinition();
    result.id = trainingDefinitionDTO.id;
    result.sandboxDefinitionId = trainingDefinitionDTO.sandBoxDefinitionRefDto.id;
    result.title = trainingDefinitionDTO.title;
    result.description = trainingDefinitionDTO.description;
    result.authorIds = trainingDefinitionDTO.authorRefDto.map(author => author.id);
    result.prerequisites =  trainingDefinitionDTO.prerequisities;
    result.outcomes = trainingDefinitionDTO.outcomes;
    result.state = TrainingDefinitionStateEnum[trainingDefinitionDTO.state];
    result.levels = trainingDefinitionDTO.basicLevelInfoDtos.map(level => this.createLevelFromBasicInfo(level))
    result.startingLevel = trainingDefinitionDTO.startingLevel;
    console.log('CREATED TRAINING DEFINITION: ' + result);
    return result;
  }


  private createLevelFromBasicInfo(levelBasicInfoDTO: BasicLevelInfoDTO ): AbstractLevel {
    const result = this.createLevelByType(levelBasicInfoDTO.levelType);
    result.id = levelBasicInfoDTO.id;
    result.order = levelBasicInfoDTO.order;
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
