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
import {Paginated} from '../other/paginated';
import {TrainingInstanceDTO} from './training-instance-dto';


export interface TrainingInstanceRestResource {
    /**
     * Retrieved Training Instances from databases.
     */
    content?: Array<TrainingInstanceDTO>;
    /**
     * Paginated including: page number, number of elements in page, size, total elements and total pages.
     */
    pagination?: Paginated;
}
