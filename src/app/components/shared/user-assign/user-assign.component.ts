import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'kypo2-auth';
import {map, takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {DisplayableResource} from '../../../model/training/displayable-resource';
import {UserAssignService} from '../../../services/shared/user-assign.service';

@Component({
  selector: 'kypo2-user-assign',
  templateUrl: './user-assign.component.html',
  styleUrls: ['./user-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignComponent extends BaseComponent implements OnInit {

  @Input() resource: DisplayableResource;
  @Input() toAssignTitle: string;
  @Input() assigneesTitle: string;
  @Output() hasUnsavedChanges: EventEmitter<boolean> = new EventEmitter();

  toAssign: Observable<User[]>;
  assignees: Observable<Kypo2Table<User>>;
  assigneesTotalLength = 0;
  assigneesTableHasError = false;
  selectedToAssign: User[] = [];
  selectedAssignees: User[] = [];

  private lastLoadEvent: LoadTableEvent;

  constructor(private usersService: UserAssignService) {
    super();
  }

  ngOnInit() {
    this.assignees = this.usersService.assignedUsers$;
    this.lastLoadEvent = new LoadTableEvent(null, null);
    this.onAssigneesLoadEvent();
  }

  getToAssign(filterValue: string) {
    this.toAssign = this.usersService.getAvailableToAssign(this.resource.id, filterValue)
      .pipe(
        map(resource => resource.elements)
      );
  }

  getAssignees(pagination: RequestedPagination, filterValue: string = null) {
    this.assigneesTableHasError = false;
    this.usersService.getAssigned(this.resource.id, pagination, filterValue)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedUsers => this.assigneesTotalLength = paginatedUsers.pagination.totalElements,
        err => this.assigneesTableHasError = true);
  }

  assign() {
    this.usersService.assign(this.resource.id, this.selectedToAssign)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => {
        this.onAssigneesLoadEvent();
        this.selectedToAssign = [];
        this.hasUnsavedChanges.emit(this.calculateHasUnsavedChanges());
    });
  }

  onAssigneesTableAction(event: TableActionEvent<User>) {
    if (event.action.label.toLowerCase() === 'delete') {
      this.deleteAssignee(event.element);
    }
  }

  deleteAssignee(author: User) {
    this.usersService.unassign(this.resource.id, [author])
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.onAssigneesDeleted());
  }

  deleteSelectedAssignees() {
    this.usersService.unassign(this.resource.id, this.selectedAssignees)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.onAssigneesDeleted());
  }

  onToAssignSelection(selected: User[]) {
    this.hasUnsavedChanges.emit(true);
    this.selectedToAssign = selected;
  }

  onAssigneesLoadEvent(loadEvent: LoadTableEvent = null) {
    this.selectedAssignees = [];
    if (loadEvent) {
      this.lastLoadEvent = loadEvent;
      this.getAssignees(loadEvent.pagination, loadEvent.filter);
    } else {
      this.getAssignees(this.lastLoadEvent.pagination, this.lastLoadEvent.filter);
    }
  }

  onAssigneesSelection(selected: User[]) {
    this.selectedAssignees = selected;
  }

  private calculateHasUnsavedChanges(): boolean {
    return this.selectedAssignees.length > 0 || this.selectedToAssign.length > 0;
  }

  private onAssigneesDeleted() {
    this.selectedAssignees = [];
    this.onAssigneesLoadEvent();
    this.hasUnsavedChanges.emit(this.calculateHasUnsavedChanges());
  }
}
