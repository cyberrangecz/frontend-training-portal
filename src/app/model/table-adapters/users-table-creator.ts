import {PaginatedResource} from './paginated-resource';
import {User} from 'kypo2-auth';
import {Column, Kypo2Table, Row} from 'kypo2-table';
import {of} from 'rxjs';

export class UsersTableCreator {
  static create(resource: PaginatedResource<User[]>): Kypo2Table<User> {
    const actions = [{
      label: 'Delete',
      icon: 'delete',
      color: 'warn',
      tooltip: 'Delete author',
      disabled$: of(false)
    }];
    const table = new Kypo2Table<User>(
      resource.elements.map(user => new Row(user, actions)),
      [
        new Column('id', 'id', false),
        new Column('name', 'name', true, 'familyName'),
        new Column('login', 'login', true, 'login')
      ]
    );
    table.pagination = resource.pagination;
    table.filterable = true;
    table.selectable = true;
    table.filterLabel = 'Filter by name';
    return table;
  }
}
