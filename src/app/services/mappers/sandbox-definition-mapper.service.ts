import {SandboxDefinition} from '../../model/sandbox/sandbox-definition';
import {SandboxDefinitionDTO} from '../../model/DTOs/sandbox-definition/sandbox-definition-dto';
import {SandboxPaginated} from '../../model/DTOs/other/sandbox-paginated';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {PaginatedTable} from '../../model/table-adapters/paginated-table';
import {TableAdapterPagination} from '../../model/table-adapters/table-adapter-pagination';

/**
 * Maps DTOs of sandbox definitions to model
 */
export class SandboxDefinitionMapperService {

  mapSandboxDefinitionDTOToSandboxDefinitionPaginated(paginatedDTO: SandboxPaginated<SandboxDefinitionDTO>): PaginatedTable<SandboxDefinitionTableRow[]> {
    const tableData = paginatedDTO.results.map(sandboxDTO => new SandboxDefinitionTableRow(this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO)));
    const tablePagination = new TableAdapterPagination(
      paginatedDTO.page,
      paginatedDTO.results.length,
      paginatedDTO.page_size,
      paginatedDTO.count,
      paginatedDTO.page_count);
    return new PaginatedTable(tableData, tablePagination);
  }

  mapSandboxDefinitionsDTOToSandboxDefinitions(sandboxDTOs: SandboxDefinitionDTO[]): SandboxDefinition[] {
    return sandboxDTOs.map(sandboxDTO => this.mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO));
  }

  mapSandboxDefinitionDTOToSandboxDefinition(sandboxDTO: SandboxDefinitionDTO): SandboxDefinition {
    const result = new SandboxDefinition();
    result.id = sandboxDTO.id;
    result.title = sandboxDTO.name;
    result.url = sandboxDTO.url;
    return result;
  }
}
