import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {User} from 'kypo2-auth';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {DisplayableResource} from '../../../model/training/displayable-resource';
import {UserAssignService} from '../../../services/shared/user-assign.service';
import {BaseComponent} from '../../base.component';
import {UsersTableCreator} from '../../../model/table-adapters/users-table-creator';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'kypo2-user-assign',
  templateUrl: './user-assign.component.html',
  styleUrls: ['./user-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() resource: DisplayableResource;
  @Input() toAssignTitle: string;
  @Input() assigneesTitle: string;
  @Output() hasUnsavedChanges: EventEmitter<boolean> = new EventEmitter();

  toAssign: Observable<User[]>;
  assignees$: Observable<Kypo2Table<User>>;
  assigneesTotalLength$: Observable<number>;
  assigneesTableHasError$: Observable<boolean>;
  isLoadingAssignees$: Observable<boolean>;
  selectedToAssign: User[] = [];
  selectedAssignees: User[] = [];

  constructor(private usersService: UserAssignService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('resource' in changes && this.resource && this.resource.id !== undefined) {
      this.initTable();
    }
  }

  getToAssign(filterValue: string) {
    this.toAssign = this.usersService.getAvailableToAssign(this.resource.id, filterValue)
      .pipe(
        map(resource => resource.elements),
      );
  }

  assign() {
    this.usersService.assign(this.resource.id, this.selectedToAssign)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => {
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

  onAssigneesLoadEvent(loadEvent: LoadTableEvent) {
    this.usersService.getAssigned(this.resource.id, loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  onAssigneesSelection(selected: User[]) {
    this.selectedAssignees = selected;
  }

  private calculateHasUnsavedChanges(): boolean {
    return this.selectedAssignees.length > 0 || this.selectedToAssign.length > 0;
  }

  private onAssigneesDeleted() {
    this.selectedAssignees = [];
    this.hasUnsavedChanges.emit(this.calculateHasUnsavedChanges());
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.assignees$ = this.usersService.assignedUsers$
      .pipe(
        map(paginatedUsers => UsersTableCreator.create(paginatedUsers))
      );
    this.assigneesTableHasError$ = this.usersService.hasError$;
    this.assigneesTotalLength$ = this.usersService.totalLength$;
    this.isLoadingAssignees$ = this.usersService.isLoadingAssigned$;
    this.onAssigneesLoadEvent(initialLoadEvent);
  }
}
