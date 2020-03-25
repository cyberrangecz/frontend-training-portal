import {AllocationRequest} from '../../sandbox/pool/request/allocation-request';
import {Request} from '../../sandbox/pool/request/request';
import {CleanupRequest} from '../../sandbox/pool/request/cleanup-request';
import {RequestDTO} from '../../DTOs/sandbox-instance/request-dto';

export class RequestMapper {

  static fromDTOs(dtos: RequestDTO[], type: 'ALLOCATION' | 'CLEANUP'): Request[] {
    return dtos.map(dto => RequestMapper.fromDTO(dto, type));
  }

  static fromDTO(dto: RequestDTO, type: 'ALLOCATION' | 'CLEANUP'): Request {
    const request = type === 'ALLOCATION' ? new AllocationRequest() : new CleanupRequest();
    request.id = dto.id;
    request.allocationUnitId = dto.allocation_unit;
    request.createdAt = new Date(dto.created);
    return request;
  }
}
