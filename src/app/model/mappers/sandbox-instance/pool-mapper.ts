import {PoolDTO} from '../../DTOs/sandbox-instance/pool-dto';
import {Pool} from '../../sandbox/pool/pool';
import {PoolCreateDTO} from '../../DTOs/sandbox-instance/pool-create-dto';

export class PoolMapper {

  static fromDTO(dto: PoolDTO): Pool {
    const pool = new Pool();
    pool.id = dto.id;
    pool.definitionId = dto.definition;
    pool.lockId = dto.lock;
    pool.usedSize = dto.size;
    pool.maxSize = dto.max_size;
    return pool;
  }

  static fromDTOs(dtos: PoolDTO[]): Pool[] {
    return dtos.map(dto => PoolMapper.fromDTO(dto));
  }

  static toCreateDTO(pool: Pool): PoolCreateDTO {
    const dto = new PoolCreateDTO();
    dto.definition = pool.definitionId;
    dto.max_size = pool.maxSize;
    return dto;
  }
}
