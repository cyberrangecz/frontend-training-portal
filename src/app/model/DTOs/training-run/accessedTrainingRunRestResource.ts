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
import { AccessedTrainingRunDTO } from './accessedTrainingRunDTO';
import { Pagination } from '../other/pagination';


export interface AccessedTrainingRunRestResource {
    /**
     * Retrieved Accessed Training Runs from databases.
     */
    content?: Array<AccessedTrainingRunDTO>;
    /**
     * Pagination including: page number, number of elements in page, size, total elements and total pages.
     */
    pagination?: Pagination;
}
