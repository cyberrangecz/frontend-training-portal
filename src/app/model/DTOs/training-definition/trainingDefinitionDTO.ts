import {AbstractLevelDTO} from "../level/abstractLevelDTO";
import {BetaTestingGroupDTO} from "./betaTestingGroupDTO";
import {UserRefDTO} from '../user/user-ref-dto';



export class TrainingDefinitionDTO {
  authors?: Array<UserRefDTO>;
  levels?: Array<AbstractLevelDTO>;
  description?: string;
  id?: number;
  outcomes?: Array<string>;
  prerequisities?: Array<string>;
  sandbox_definition_ref_id?: number;
  show_stepper_bar?: boolean;
  starting_level?: number;
  state?: TrainingDefinitionDTO.StateEnum;
  title?: string;
  beta_testing_group?: BetaTestingGroupDTO;
}
export namespace TrainingDefinitionDTO {
    export type StateEnum = 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
    export const StateEnum = {
        RELEASED: 'RELEASED' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum,
        UNRELEASED: 'UNRELEASED' as StateEnum
    }
}
