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


export interface BasicLevelInfoDTO {
    id?: number;
    level_type?: BasicLevelInfoDTO.LevelTypeEnum;
    order?: number;
    title?: string;
}
export namespace BasicLevelInfoDTO {
    export type LevelTypeEnum = 'ASSESSMENT' | 'INFO' | 'GAME';
    export const LevelTypeEnum = {
        ASSESSMENT: 'ASSESSMENT' as LevelTypeEnum,
        INFO: 'INFO' as LevelTypeEnum,
        GAME: 'GAME' as LevelTypeEnum
    }
}
