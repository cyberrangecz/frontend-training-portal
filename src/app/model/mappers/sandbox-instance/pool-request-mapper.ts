import {PoolRequestDTO} from '../../DTOs/sandbox-instance/pool-request-dto';
import {PoolCreationRequest} from '../../sandbox/pool/request/pool-creation-request';
import {PoolRequest} from '../../sandbox/pool/request/pool-request';

export class PoolRequestMapper {

  static fromDTO(dto: PoolRequestDTO, type: 'CLEANUP' | 'CREATION'): PoolRequest {
    const request = new PoolCreationRequest();
    request.id = dto.id;
    request.poolId = dto.pool;
    request.createdAt = new Date(dto.created);
    return request;
  }

  static fromDTOs(dtos: PoolRequestDTO[], type: 'CLEANUP' | 'CREATION'): PoolRequest[] {
    return dtos.map(dto => PoolRequestMapper.fromDTO(dto, type));
  }
}
