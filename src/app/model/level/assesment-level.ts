import {AbstractLevel} from "./abstract-level";
import {AssessmentTypeEnum} from "../../enums/assessment-type-enum";
import {TrainingDefinition} from "../training/training-definition";

export class AssesmentLevel extends AbstractLevel {
  questions: JSON;
  instructions: string;
  assessmentType: AssessmentTypeEnum;


  constructor(id: number, trainingDefinition: TrainingDefinition, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, questions: JSON, assessmentType: AssessmentTypeEnum) {
    super(id, trainingDefinition, title, maxScore, order, preHook, postHook);
    this.questions = questions;
    this.assessmentType = assessmentType;
  }
}
