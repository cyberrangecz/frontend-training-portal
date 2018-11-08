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
import { TrainingDefinitionDTO } from './trainingDefinitionDTO';
import { UserRefDTO } from './userRefDTO';


/**
 * Training Instance.
 */
export interface TrainingInstanceDTO {
    end_time?: Date;
    id?: number;
    organizers?: Array<UserRefDTO>;
    pool_size?: number;
    start_time?: Date;
    title?: string;
    training_definition?: TrainingDefinitionDTO;
}
