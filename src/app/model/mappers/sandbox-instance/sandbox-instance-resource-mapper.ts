import {SandboxInstanceResourceDTO} from '../../DTOs/sandbox-instance/sandbox-instance-resource-dto';
import {SandboxInstanceResource} from '../../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';

export class SandboxInstanceResourceMapper {

  static fromDTO(dto: SandboxInstanceResourceDTO): SandboxInstanceResource {
    const resource = new SandboxInstanceResource();
    resource.name = dto.name;
    resource.status = dto.status;
    resource.type = dto.type;
    return resource;
  }

  static fromDTOs(dtos: SandboxInstanceResourceDTO[]): SandboxInstanceResource[] {
    return dtos.map(dto => SandboxInstanceResourceMapper.fromDTO(dto));
  }
}
