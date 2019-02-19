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
import { Pagination } from '../other/pagination';
import { TrainingRunDTO } from './trainingRunDTO';


export interface TrainingRunRestResource {
    /**
     * Retrieved Training Runs from databases.
     */
    content?: Array<TrainingRunDTO>;
    /**
     * Pagination including: page number, number of elements in page, size, total elements and total pages.
     */
    pagination?: Pagination;
}
