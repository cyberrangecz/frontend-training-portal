import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {AbstractLevel} from "./abstract-level";
import {LevelTypeEnum} from "../../enums/level-type.enum";
import {AbstractQuestion} from "../questions/abstract-question";

/**
 * Class representing level in a game of type Assessment
 */
export class AssessmentLevel extends AbstractLevel {
  questions: AbstractQuestion[];
  instructions: string;
  maxScore: number;
  assessmentType: AssessmentTypeEnum;


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string, questions: AbstractQuestion[], assessmentType: AssessmentTypeEnum) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook, LevelTypeEnum.Assessment);
    this.questions = questions;
    this.assessmentType = assessmentType;
  }
}
