import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';
import {SandboxDefinitionDTO} from '../../model/DTOs/sandbox-definition/sandbox-definition-dto';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';

/**
 * Maps DTOs of sandbox definitions to model
 */
export class SandboxDefinitionMapperService {

  mapSandboxDefinitionDTOToSandboxDefinitionPaginated(paginatedDTO: DjangoResourceDTO<SandboxDefinitionDTO>): PaginatedResource<SandboxDefinitionTableRow[]> {
    const tableData = paginatedDTO.results
      .map(sandboxDTO =>
        new SandboxDefinitionTableRow(this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO)));

    const tablePagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(tableData, tablePagination);
  }

  mapSandboxDefinitionsDTOToSandboxDefinitions(sandboxDTOs: SandboxDefinitionDTO[]): SandboxDefinition[] {
    return sandboxDTOs.map(sandboxDTO => this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO));
  }

  mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO: SandboxDefinitionDTO): SandboxDefinition {
    const result = new SandboxDefinition();
    result.id = sandboxDTO.id;
    result.title = sandboxDTO.name;
    result.url = sandboxDTO.url;
    result.rev = sandboxDTO.rev;
    return result;
  }
}
