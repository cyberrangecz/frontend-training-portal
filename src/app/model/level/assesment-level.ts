import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {AbstractLevel} from "./abstract-level";

export class AssesmentLevel extends AbstractLevel {
  questions: JSON;
  instructions: string;
  assessmentType: AssessmentTypeEnum;


  constructor(id: number, trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, questions: JSON, assessmentType: AssessmentTypeEnum) {
    super(id, trainingDefinitionId, title, maxScore, order, preHook, postHook);
    this.questions = questions;
    this.assessmentType = assessmentType;
  }
}
