import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from 'kypo2-auth';
import {PaginatedTable} from '../../../model/table-adapters/paginated-table';
import {UserSelectionTableAdapter} from '../../../model/table-adapters/user-selection-table-adapter';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'user-selection-table',
  templateUrl: './user-selection-table.component.html',
  styleUrls: ['./user-selection-table.component.css']
})
export class UserSelectionTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() users: UserSelectionTableAdapter[] | PaginatedTable<UserSelectionTableAdapter[]>;
  @Output() paginationChange: EventEmitter<PageEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<User[]> = new EventEmitter();

  displayedColumns = ['select', 'name', 'issuer'];
  @Input() selectedUsers: User[];
  dataSource: MatTableDataSource<UserSelectionTableAdapter>;
  paginated = false;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('users' in changes && this.users) {
      this.initDataSource();
    }
  }

  onSelectChange(row: UserSelectionTableAdapter) {
    row.selected ? this.unselect(row) : this.select(row);
    this.selectionChange.emit(this.selectedUsers);
  }

  private select(row: UserSelectionTableAdapter) {
    row.selected = true;
    this.selectedUsers.push(row.user);
  }

  private unselect(row: UserSelectionTableAdapter) {
    row.selected = false;
    const indexToRemove = this.selectedUsers.findIndex(user => user.equals(row.user));
    this.selectedUsers.splice(indexToRemove, 1);
  }

  private initDataSource() {
    if (this.users instanceof PaginatedTable) {
      this.dataSource = new MatTableDataSource(this.users.tableData);
      this.paginated = true;
      this.dataSource.paginator = this.paginator;
      this.paginationChange = this.paginator.page;
    } else {
      this.dataSource = new MatTableDataSource(this.users);
    }
    this.dataSource.filterPredicate =
      (data: UserSelectionTableAdapter, filter: string) =>
        data.user.name.toLowerCase().indexOf(filter) !== -1;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
