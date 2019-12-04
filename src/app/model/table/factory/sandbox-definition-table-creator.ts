import {Column, Kypo2Table, Row, RowExpand} from 'kypo2-table';
import {of} from 'rxjs';
import {SandboxDefinitionDetailComponent} from '../../../components/sandbox-definition/sandbox-definition-overview/sandbox-definition-detail/sandbox-definition-detail.component';
import {PaginatedResource} from '../other/paginated-resource';
import {SandboxDefinition} from '../../sandbox/definition/sandbox-definition';

export class SandboxDefinitionTableCreator {
  static create(resource: PaginatedResource<SandboxDefinition[]>): Kypo2Table<SandboxDefinition> {

    const actions = [{
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        tooltip: 'Delete',
        disabled$: of(false)
      }];
    const table = new Kypo2Table<SandboxDefinition>(
      resource.elements.map(sandboxDef => new Row(sandboxDef, actions)),
      [
        new Column('id', 'id', false),
        new Column('title', 'title', false),
      ]
    );
    table.expand = new RowExpand(SandboxDefinitionDetailComponent);
    table.pagination = resource.pagination;
    table.filterable = false;
    table.selectable = false;
    return table;
  }
}
