import {Injectable} from "@angular/core";

@Injectable()
/**
 * Service to abstract communication with sandbox definition endpoint.
 * Can send requests to create, edit, delete sandbox definition.
 */
export class SandboxDefinitionSetterService {

  /**
   * Sends request to remove sandbox definition with provided id
   * @param {number} id id of sandbox definition which should be removed
   */
  removeSandboxDefinition(id: number) {
    // TODO: REQUEST to remove sandbox with id
  }

  deploySandboxDefinition(id: number) {
    // TODO: REQUEST to deploy sandbox deifiniton
  }

}
