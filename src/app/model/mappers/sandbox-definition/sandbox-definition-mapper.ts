import {SandboxDefinitionDTO} from '../../DTOs/sandbox-definition/sandbox-definition-dto';
import {SandboxDefinition} from '../../sandbox/definition/sandbox-definition';

export class SandboxDefinitionMapper {

  static fromDTO(dto: SandboxDefinitionDTO): SandboxDefinition {
    const sandbox = new SandboxDefinition();
    sandbox.id = dto.id;
    sandbox.title = dto.name;
    sandbox.url = dto.url;
    sandbox.rev = dto.rev;
    return sandbox;
  }

  static fromDTOs(dtos: SandboxDefinitionDTO[]): SandboxDefinition[] {
    return dtos.map(dto => SandboxDefinitionMapper.fromDTO(dto));
  }
}
