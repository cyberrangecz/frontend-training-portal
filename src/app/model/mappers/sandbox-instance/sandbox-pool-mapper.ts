import {SandboxPoolDTO} from '../../DTOs/sandbox-instance/sandbox-pool-dto';
import {SandboxPool} from '../../sandbox/pool/sandbox-pool';

export class SandboxPoolMapper {

  static fromDTO(dto: SandboxPoolDTO): SandboxPool {
    const pool = new SandboxPool();
    pool.id = dto.id;
    pool.definitionId = dto.definition;
    pool.usedSize = dto.size;
    pool.maxSize = dto.max_size;
    pool.usedAndMaxSize = `${pool.usedSize}/${pool.maxSize}`;
    return pool;
  }

  static fromDTOs(dtos: SandboxPoolDTO[]): SandboxPool[] {
    return dtos.map(dto => SandboxPoolMapper.fromDTO(dto));
  }
}
