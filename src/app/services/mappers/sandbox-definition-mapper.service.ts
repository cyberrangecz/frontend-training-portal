import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {SandboxDefinitionDTO} from '../../model/DTOs/sandbox-definition/sandbox-definition-dto';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {DjangoApiPaginationMapper} from './django-api-pagination-mapper';

/**
 * Maps DTOs of sandbox definitions to internal model
 */
export class SandboxDefinitionMapper {

  /**
   * Maps sandbox definition dtos with pagination to a paginated sandbox definitions
   * @param paginatedDTO dtos to be mapped on internal model
   */
  mapSandboxDefinitionDTOToSandboxDefinitionPaginated(paginatedDTO: DjangoResourceDTO<SandboxDefinitionDTO>)
    : PaginatedResource<SandboxDefinition[]> {
    const tableData = paginatedDTO.results
      .map(sandboxDTO => this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO));

    const tablePagination = DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(tableData, tablePagination);
  }

  /**
   * Maps sandbox definition dtos to sandbox definitions
   * @param sandboxDTOs dtos to be mapped on internal model
   */
  mapSandboxDefinitionsDTOToSandboxDefinitions(sandboxDTOs: SandboxDefinitionDTO[]): SandboxDefinition[] {
    return sandboxDTOs.map(sandboxDTO => this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO));
  }

  /**
   * Maps sandbox definition dto with to a sandbox definition
   * @param sandboxDTO dto to be mapped on internal model
   */
  mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO: SandboxDefinitionDTO): SandboxDefinition {
    const result = new SandboxDefinition();
    result.id = sandboxDTO.id;
    result.title = sandboxDTO.name;
    result.url = sandboxDTO.url;
    result.rev = sandboxDTO.rev;
    return result;
  }
}
