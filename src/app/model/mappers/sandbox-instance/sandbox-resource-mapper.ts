import {SandboxResourceDTO} from '../../DTOs/sandbox-instance/sandbox-resource-dto';
import {SandboxResource} from '../../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-resource';

export class SandboxResourceMapper {

  static fromDTO(dto: SandboxResourceDTO): SandboxResource {
    const resource = new SandboxResource();
    resource.name = dto.name;
    resource.status = dto.status;
    resource.type = dto.type;
    return resource;
  }

  static fromDTOs(dtos: SandboxResourceDTO[]): SandboxResource[] {
    return dtos.map(dto => SandboxResourceMapper.fromDTO(dto));
  }
}
