

/**
 * Assessment Level to update.
 */
export interface AssessmentLevelUpdateDTO {
    id?: number;
    title?: string;
    max_score?: number;
    estimated_duration: number;
    instructions?: string;
    questions?: string;
    type?: AssessmentLevelUpdateDTO.TypeEnum;
}
export namespace AssessmentLevelUpdateDTO {
    export type TypeEnum = 'TEST' | 'QUESTIONNAIRE';
    export const TypeEnum = {
        TEST: 'TEST' as TypeEnum,
        QUESTIONNAIRE: 'QUESTIONNAIRE' as TypeEnum
    }
}

export class AssessmentLevelUpdateDTOClass implements AssessmentLevelUpdateDTO {
  id: number;
  instructions: string;
  max_score: number;
  questions: string;
  title: string;
  estimated_duration: number;
  type: AssessmentLevelUpdateDTO.TypeEnum;
}
