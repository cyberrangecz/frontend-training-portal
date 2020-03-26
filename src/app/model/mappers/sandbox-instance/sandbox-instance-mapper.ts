import {SandboxInstanceDTO} from '../../DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';

export class SandboxInstanceMapper {

  static fromDTO(dto: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = dto.id;
    result.allocationUnitId = dto.allocation_unit_id;
    result.lockId = dto.lock_id;
    return result;
  }

  static fromDTOs(dtos: SandboxInstanceDTO[]): SandboxInstance[] {
    return dtos.map(dto => SandboxInstanceMapper.fromDTO(dto));
  }
}
