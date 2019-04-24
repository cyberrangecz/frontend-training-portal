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
import {BetaTestingGroupUpdateDTO} from "./betaTestingGroupUpdateDTO";
import {UserBasicDTO} from "../user/user-basic-dto";


/**
 * Training Definition to update.
 */
export class TrainingDefinitionUpdateDTO {
    authors?: UserBasicDTO[];
    beta_testing_group: BetaTestingGroupUpdateDTO;
    description?: string;
    id?: number;
    outcomes?: string[];
    prerequisities?: string[];
    sandbox_definition_ref_id?: number;
    show_stepper_bar?: boolean;
    state?: TrainingDefinitionUpdateDTO.StateEnum;
    title?: string;
}

export namespace TrainingDefinitionUpdateDTO {
    export type StateEnum = 'PRIVATED' | 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
    export const StateEnum = {
        PRIVATED: 'PRIVATED' as StateEnum,
        RELEASED: 'RELEASED' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum,
        UNRELEASED: 'UNRELEASED' as StateEnum
    }
}
