import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {InfoLevelDTO} from "../../model/DTOs/infoLevelDTO";

@Injectable()
export class LevelMapperService {

  mapLevelDTOsToLevels(levelDTOs: AbstractLevelDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    levelDTOs.forEach(levelDTO => result.push(this.mapLevelDTOToLevel(levelDTO)));
    return result;
  }

  mapLevelDTOToLevel(levelDTO: AbstractLevelDTO): AbstractLevel {
    let result: AbstractLevel;
    if (levelDTO) {

    }
    return result;
  }

  private createGameLevel() {

  }

  private createInfoLevel() {

  }

  private createAssessmentLevel() {

  }

}
