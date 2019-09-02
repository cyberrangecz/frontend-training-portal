import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from 'kypo2-auth';
import {PaginatedTable} from '../../../model/table-adapters/paginated-table';
import {UserSelectionTableRowAdapter} from '../../../model/table-adapters/user-selection-table-row-adapter';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {StringNormalizer} from '../../../model/utils/ignore-diacritics-filter';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-user-selection-table',
  templateUrl: './user-selection-table.component.html',
  styleUrls: ['./user-selection-table.component.css']
})
/**
 * PRESENTATIONAL
 * Selectable table displaying user info
 */
export class UserSelectionTableComponent extends BaseComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  /**
   * Users to display
   */
  @Input() users: UserSelectionTableRowAdapter[] | PaginatedTable<UserSelectionTableRowAdapter[]>;
  /**
   * Users that should be checked as selected on initialization
   */
  @Input() preselectedUsers: User[];

  /**
   * Triggered on pagination change. Emits Material table page event
   */
  @Output() paginationChange: EventEmitter<PageEvent> = new EventEmitter();
  /**
   * Triggered on selection change. Emits seelcted users
   */
  @Output() selectionChange: EventEmitter<User[]> = new EventEmitter();

  displayedColumns = ['select', 'name', 'issuer'];
  dataSource: MatTableDataSource<UserSelectionTableRowAdapter>;
  paginated = false;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('users' in changes && this.users) {
      this.initDataSource();
    }
  }

  onSelectChange(row: UserSelectionTableRowAdapter) {
    row.selected ? this.unselect(row) : this.select(row);
    this.selectionChange.emit(this.preselectedUsers);
  }

  private select(row: UserSelectionTableRowAdapter) {
    row.selected = true;
    this.preselectedUsers.push(row.user);
  }

  private unselect(row: UserSelectionTableRowAdapter) {
    row.selected = false;
    const indexToRemove = this.preselectedUsers.findIndex(user => user.equals(row.user));
    this.preselectedUsers.splice(indexToRemove, 1);
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
      (data: UserSelectionTableRowAdapter, filter: string) =>
        data.normalizedName.indexOf(filter) !== -1;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = StringNormalizer.normalizeDiacritics(filterValue.trim().toLowerCase());
  }
}
