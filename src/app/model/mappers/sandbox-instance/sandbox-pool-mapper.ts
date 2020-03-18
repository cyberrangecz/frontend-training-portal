import {SandboxPoolDTO} from '../../DTOs/sandbox-instance/sandbox-pool-dto';
import {SandboxPool} from '../../sandbox/pool/sandbox-pool';
import {SandboxPoolCreateDTO} from '../../DTOs/sandbox-instance/sandbox-pool-create-dto';

export class SandboxPoolMapper {

  static fromDTO(dto: SandboxPoolDTO): SandboxPool {
    const pool = new SandboxPool();
    pool.id = dto.id;
    pool.definitionId = dto.definition;
    pool.lockId = dto.lock;
    pool.usedSize = dto.size;
    pool.maxSize = dto.max_size;
    pool.usedAndMaxSize = `${pool.usedSize}/${pool.maxSize}`;
    return pool;
  }

  static fromDTOs(dtos: SandboxPoolDTO[]): SandboxPool[] {
    return dtos.map(dto => SandboxPoolMapper.fromDTO(dto));
  }

  static toCreateDTO(pool: SandboxPool): SandboxPoolCreateDTO {
    const dto = new SandboxPoolCreateDTO();
    dto.definition = pool.definitionId;
    dto.max_size = pool.maxSize;
    return dto;
  }
}
