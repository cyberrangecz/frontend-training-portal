import {AbstractLevelDTO} from "./abstractLevelDTO";

export interface AssessmentLevelDTO extends AbstractLevelDTO {
  instructions?: string;
  questions?: string;
  type?: AssessmentLevelDTO.TypeEnum;
}
export namespace AssessmentLevelDTO {
  export type TypeEnum = 'TEST' | 'QUESTIONNAIRE';
  export const TypeEnum = {
    TEST: 'TEST' as TypeEnum,
    QUESTIONNAIRE: 'QUESTIONNAIRE' as TypeEnum
  }
}
