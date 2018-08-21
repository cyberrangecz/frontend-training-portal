/**
 * Parent class of all level types. Can't be instantiated
 */
import {LevelTypeEnum} from "../../enums/level-type.enum";

export abstract class AbstractLevel {
  id: number;
  trainingDefinitionId: number;
  title: string;
  maxScore: number;
  order: number;
  preHook: string;
  postHook: string;

  // custom attributes
  type: LevelTypeEnum;


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string, type: LevelTypeEnum) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.title = title;
    this.maxScore = maxScore;
    this.order = order;
    this.preHook = preHook;
    this.postHook = postHook;
    this.type = type;
  }
}
