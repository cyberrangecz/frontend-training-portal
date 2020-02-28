import {Column, Kypo2Table, Row, RowExpand} from 'kypo2-table';
import {of} from 'rxjs';
import {SandboxDefinitionDetailComponent} from '../../../components/sandbox-definition/overview/sandbox-definition-detail/sandbox-definition-detail.component';
import {PaginatedResource} from '../other/paginated-resource';
import {SandboxDefinition} from '../../sandbox/definition/sandbox-definition';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxDefinitionTableCreator {

  static readonly DELETE_ACTION_ID = 'delete';

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   */
  static create(resource: PaginatedResource<SandboxDefinition>): Kypo2Table<SandboxDefinition> {

    const actions = [{
      id: this.DELETE_ACTION_ID,
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
