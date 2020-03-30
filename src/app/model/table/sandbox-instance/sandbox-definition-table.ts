import {Column, Kypo2Table, Row, RowExpand} from 'kypo2-table';
import {defer, of} from 'rxjs';
import {SandboxDefinitionDetailComponent} from '../../../components/sandbox-definition/overview/sandbox-definition-detail/sandbox-definition-detail.component';
import {KypoPaginatedResource} from 'kypo-common';
import {SandboxDefinition} from 'kypo-sandbox-model';
import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {DeleteAction} from 'kypo2-table';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxDefinitionTable extends Kypo2Table<SandboxDefinition> {

  constructor(resource: KypoPaginatedResource<SandboxDefinition>, service: SandboxDefinitionOverviewService) {
    const columns = [
      new Column('id', 'id', false),
      new Column('title', 'title', false),
    ];
    const rows = resource.elements.map(element => SandboxDefinitionTable.createRow(element, service));
    super(rows, columns);
    this.expand = new RowExpand(SandboxDefinitionDetailComponent);
    this.pagination = resource.pagination;
    this.filterable = false;
    this.selectable = false;
  }

  private static createRow(sandboxDefinition: SandboxDefinition, service: SandboxDefinitionOverviewService): Row<SandboxDefinition> {
    const actions = [
      new DeleteAction(
        'Delete sandbox definition',
        of(false),
        defer(() => service.delete(sandboxDefinition))
      )
    ];
    return new Row(sandboxDefinition, actions);
  }
}
