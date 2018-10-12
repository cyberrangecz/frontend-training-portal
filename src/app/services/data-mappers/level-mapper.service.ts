import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";

@Injectable()
export class LevelMapperService {

  mapLevelDTOsToLevels(levelDTOs: AbstractLevelDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];

    return result;
  }

  mapLevelDTOToLevel(levelDTO: AbstractLevelDTO): AbstractLevel {
    let result: AbstractLevel;

    return result;
  }

  private createGameLevel() {

  }

  private createInfoLevel() {

  }

  private createAssessmentLevel() {

  }

}
