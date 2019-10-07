import {SandboxPoolDTO} from '../DTOs/sandbox-instance/sandbox-pool-dto';

export class SandboxPool {
  id: number;
  definitionId: number;
  usedSize: number;
  maxSize: number;
  usedAndMaxSize: string;

  static fromDTO(dto: SandboxPoolDTO): SandboxPool {
    const pool = new SandboxPool();
    pool.id = dto.id;
    pool.definitionId = dto.definition;
    pool.usedSize = dto.size;
    pool.maxSize = dto.max_size;
    pool.usedAndMaxSize = `${pool.usedSize}/${pool.maxSize}`;
    return pool;
  }
}
