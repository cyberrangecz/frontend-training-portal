import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {AbstractLevel} from "../../model/level/abstract-level";

@Injectable()
export class DesignerLevelsService {
  trainingDef: TrainingDefinition;
  levels: AbstractLevel[];

}
