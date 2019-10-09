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
import { AbstractLevelDTO } from '../level/abstract-level-dto';
import { BasicLevelInfoDTO } from '../level/basic-level-info-dto';
import {HintDTO} from '../level/game/hint-dto';


/**
 * .
 */
export interface AccessTrainingRunDTO {
    abstract_level_dto?: AbstractLevelDTO;
    info_about_levels?: Array<BasicLevelInfoDTO>;
    training_run_id: number;
    sandbox_instance_ref_id: number;
    show_stepper_bar: boolean;
    start_time: Date;
    taken_solution: string;
    taken_hints: HintDTO[];
}
