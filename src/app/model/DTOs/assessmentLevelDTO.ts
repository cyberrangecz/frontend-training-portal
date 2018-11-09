import {AbstractLevelDTO} from "./abstractLevelDTO";

export interface AssessmentLevelDTO extends AbstractLevelDTO {
  assessment_type: AssessmentLevelDTO.AssessmentTypeEnum;
  instructions: string;
  questions: string;
}

export namespace AssessmentLevelDTO {
  export type AssessmentTypeEnum = 'TEST' | 'QUESTIONNAIRE';
  export const AssessmentTypeEnum = {
    TEST: 'TEST' as AssessmentTypeEnum,
    QUESTIONNAIRE: 'QUESTIONNAIRE' as AssessmentTypeEnum
  }
}
