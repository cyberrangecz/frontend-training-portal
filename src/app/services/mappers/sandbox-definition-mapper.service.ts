import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {SandboxDefinitionDTO} from "../../model/DTOs/sandbox-definition/sandbox-definition-dto";

export class SandboxDefinitionMapperService {

  mapSandboxDefinitionsDTOToSandboxDefinitions(sandboxDTOs: SandboxDefinitionDTO[]): SandboxDefinition[] {
    return sandboxDTOs.map(sandboxDTO => this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO));
  }

  mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO: SandboxDefinitionDTO): SandboxDefinition {
    const result = new SandboxDefinition();
    result.id = sandboxDTO.id;
    result.title = sandboxDTO.name;
    return result;
  }
}
