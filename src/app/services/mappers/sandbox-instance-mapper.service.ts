import {Injectable} from '@angular/core';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxInstance} from '../../model/sandbox/sandbox-instance';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {SandboxPool} from '../../model/sandbox/sandbox-pool';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';

@Injectable()
/**
 * Maps DTOs os sandbox instances to model
 */
export class SandboxInstanceMapper {

  mapPoolsDTOsToPools(paginatedDTO: DjangoResourceDTO<SandboxPoolDTO>): PaginatedResource<SandboxPool[]> {
    const elements = paginatedDTO.results
      .map(poolDTO => SandboxPool.fromDTO(poolDTO));
    const pagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(elements, pagination);
  }

  mapSandboxInstanceDTOsToSandboxInstances(paginatedDTO: DjangoResourceDTO<SandboxInstanceDTO>): PaginatedResource<SandboxInstance[]> {
    const elements = paginatedDTO.results
      .map(sandboxDTO => SandboxInstance.fromDTO(sandboxDTO));
    const pagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(elements, pagination);
  }
}
