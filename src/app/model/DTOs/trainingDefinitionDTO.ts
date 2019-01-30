/**
 * REST API documentation
 * Developed By CSIRT team
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AuthorRefDTO } from './authorRefDTO';
import {AbstractLevelDTO} from "./abstractLevelDTO";
import {ViewGroupDTO} from "./viewGroupDTO";


/**
 * .
 */
export interface TrainingDefinitionDTO {
    authors?: Array<AuthorRefDTO>;
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
    td_view_group?: ViewGroupDTO;
}

export class TrainingDefinitionDTOClass {
  authors?: Array<AuthorRefDTO>;
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
  td_view_group?: ViewGroupDTO;
}
export namespace TrainingDefinitionDTO {
    export type StateEnum = 'PRIVATED' | 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
    export const StateEnum = {
        PRIVATED: 'PRIVATED' as StateEnum,
        RELEASED: 'RELEASED' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum,
        UNRELEASED: 'UNRELEASED' as StateEnum
    }
}
