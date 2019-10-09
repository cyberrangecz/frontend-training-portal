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
/**
 * Training Definition to create.
 */
export class TrainingDefinitionCreateDTO {
    description?: string;
    outcomes?: string[];
    prerequisities?: string[];
    sandbox_definition_ref_id: number;
    show_stepper_bar?: boolean;
    state?: TrainingDefinitionCreateDTO.StateEnum;
    title?: string;
}

export namespace TrainingDefinitionCreateDTO {
    export type StateEnum = 'PRIVATED' | 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
    export const StateEnum = {
        PRIVATED: 'PRIVATED' as StateEnum,
        RELEASED: 'RELEASED' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum,
        UNRELEASED: 'UNRELEASED' as StateEnum
    };
}
