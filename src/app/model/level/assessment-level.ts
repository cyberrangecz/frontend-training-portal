import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {AbstractLevel} from "./abstract-level";

/**
 * Class representing level in a game of type Assessment
 */
export class AssessmentLevel extends AbstractLevel {
  questions: string;
  instructions: string;
  assessmentType: AssessmentTypeEnum;


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string, questions: string, assessmentType: AssessmentTypeEnum) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook);
    this.questions = questions;
    this.assessmentType = assessmentType;
  }
}
