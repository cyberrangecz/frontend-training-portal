import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";

/**
 * Service to abstract communication with training definition endpoint.
 * Can send requests to create, edit, delete training definition.
 */
@Injectable()
export class TrainingDefinitionSetterService {

  /**
   * Sends request to remove training definition with provided id
   * @param {number} trainingDefId id of training definition which should be removed
   */
  removeTrainingDefinition(trainingDefId: number) {
    // TODO: DELETE request
  }

  /**
   * Sends request to create new training definition
   * @param {TrainingDefinition} trainingDef training definition which should be created
   */
  addTrainingDefinition(trainingDef: TrainingDefinition) {
    // TODO: POST request

  }

  /**
   * Sends request to edit training definition
   * @param {TrainingDefinition} trainingDef edited training definition
   */
  editTrainingDefinition(trainingDef: TrainingDefinition) {
    // TODO: DELETE request
  }
}
