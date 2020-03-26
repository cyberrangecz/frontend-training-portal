import {AllocationRequest} from '../../sandbox/pool/request/allocation-request';
import {Request} from '../../sandbox/pool/request/request';
import {CleanupRequest} from '../../sandbox/pool/request/cleanup-request';
import {RequestDTO} from '../../DTOs/sandbox-instance/request-dto';

export class RequestMapper {

  static fromAllocationDTOs(dtos: RequestDTO[]): AllocationRequest[] {
    return dtos.map(dto => RequestMapper.fromAllocationDTO(dto));
  }

  static fromAllocationDTO(dto: RequestDTO): AllocationRequest {
    const request = new AllocationRequest();
    this.setGeneralAttributes(request, dto);
    return request;
  }

  static fromCleanupDTOs(dtos: RequestDTO[]): CleanupRequest[] {
    return dtos.map(dto => RequestMapper.fromCleanupDTO(dto));

  }

  static fromCleanupDTO(dto: RequestDTO): CleanupRequest {
    const request = new CleanupRequest();
    this.setGeneralAttributes(request, dto);
    return request;
  }

  private static setGeneralAttributes(request: Request, dto: RequestDTO) {
    request.id = dto.id;
    request.allocationUnitId = dto.allocation_unit;
    request.createdAt = new Date(dto.created);
  }
}
