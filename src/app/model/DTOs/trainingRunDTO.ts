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
import { AbstractLevelDTO } from './abstractLevelDTO';
import { SandboxInstanceRefDTO } from './sandboxInstanceRefDTO';
import { TrainingInstanceDTO } from './trainingInstanceDTO';


/**
 * .
 */
export interface TrainingRunDTO {
    currentLevel?: AbstractLevelDTO;
    endTime?: Date;
    eventLogReference?: string;
    id?: number;
    sandboxInstanceRef?: SandboxInstanceRefDTO;
    startTime?: Date;
    state?: TrainingRunDTO.StateEnum;
    trainingInstance?: TrainingInstanceDTO;
}
export namespace TrainingRunDTO {
    export type StateEnum = 'NEW' | 'ALLOCATED' | 'READY' | 'ARCHIVED';
    export const StateEnum = {
        NEW: 'NEW' as StateEnum,
        ALLOCATED: 'ALLOCATED' as StateEnum,
        READY: 'READY' as StateEnum,
        ARCHIVED: 'ARCHIVED' as StateEnum
    }
}
