import {AbstractLevelDTO} from "../level/abstract-level-dto";

export class TrainingDefinitionDTO {
  levels?: Array<AbstractLevelDTO>;
  description?: string;
  id?: number;
  outcomes?: Array<string>;
  prerequisities?: Array<string>;
  sandbox_definition_ref_id?: number;
  show_stepper_bar?: boolean;
  state?: TrainingDefinitionDTO.StateEnum;
  title?: string;
  estimated_duration: number;
  last_edited?: Date;
}

export namespace TrainingDefinitionDTO {
    export type StateEnum = 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
    export const StateEnum = {
        RELEASED: 'RELEASED' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum,
        UNRELEASED: 'UNRELEASED' as StateEnum
    }
}
