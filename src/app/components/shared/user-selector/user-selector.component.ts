import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatOptionSelectionChange} from '@angular/material/core';
import {User} from 'kypo2-auth';
import {debounceTime, map, takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectorComponent extends BaseComponent implements OnInit, OnChanges {
  userControl = new FormControl();
  selectedUsers: User[] = [];
  isLoading = false;

  @Input() users: User[];
  @Input() userTypeLabel: string;
  @Input() selected: User[];

  @Output() selectionChange: EventEmitter<User[]> = new EventEmitter();
  @Output() fetch: EventEmitter<string> = new EventEmitter();

  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.userControl.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive),
        map(value => typeof value === 'string' ? value : value.name),
        debounceTime(300)
      ).subscribe( value => this.fetchUsers(value)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('users' in changes && this.users) {
      this.isLoading = false;
    }
    if ('selected' in changes) {
      this.selectedUsers = this.selected;
    }
  }

  fetchUsers(filter: string) {
    this.isLoading = true;
    this.fetch.emit(filter);
  }

  onSelected($event: MatAutocompleteSelectedEvent) {
    this.userInput.nativeElement.value = '';
    this.userControl.setValue('');
  }

  selectUser($event: MatOptionSelectionChange, user: User) {
    if ($event.isUserInput) {
      this.selectedUsers.push(user);
      this.selectionChange.emit(this.selectedUsers);
    }
  }

  removeSelected(index: number) {
    this.selectedUsers.splice(index, 1);
    this.selectionChange.emit(this.selectedUsers);
  }

  alreadySelected(user: User): boolean {
    return this.selectedUsers.find(selected => selected.equals(user)) !== undefined;
  }
}
