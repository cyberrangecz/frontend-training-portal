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
import { TrainingDefinitionDTO } from '../training-definition/training-definition-dto';
import { UserRefDTO } from '../user/user-ref-dto';
import {UserBasicDTO} from "../user/user-basic-dto";


/**
 * Training Instance to update.
 */
export class TrainingInstanceUpdateDTO {
    end_time?: string;
    id?: number;
    access_token?: string;
    organizers_ref_ids?: number[];
    pool_size?: number;
    start_time?: string;
    title?: string;
    training_definition_id?: number;
}
