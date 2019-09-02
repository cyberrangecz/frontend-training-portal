import {Component, Inject, OnInit} from '@angular/core';
import {UserFacade} from '../../../../../services/facades/user-facade.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {map, takeWhile} from 'rxjs/operators';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BaseComponent} from '../../../../base.component';
import {Observable} from 'rxjs';
import {UserSelectionTableRowAdapter} from '../../../../../model/table-adapters/user-selection-table-row-adapter';

@Component({
  selector: 'kypo2-organizers-picker',
  templateUrl: './organizers-picker.component.html',
  styleUrls: ['./organizers-picker.component.css']
})
/**
 * Component of popup dialog to choose from a list of possible organizers of the training instance
 */
export class OrganizersPickerComponent extends BaseComponent implements OnInit {

  users$: Observable<UserSelectionTableRowAdapter[]>;
  selectedUsers: User[] = [];
  activeUser: User;
  isLoading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public preselectedUsers: User[],
              public dialogRef: MatDialogRef<OrganizersPickerComponent>,
              private userFacade: UserFacade,
              private authService: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.activeUser = this.authService.getActiveUser();
    this.initSelectedUsers();
    this.users$ = this.loadUsers();
  }

  onSelectionChange(users: User[]) {
    this.selectedUsers = users;
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      organizers: this.selectedUsers
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      organizers: null
    };
    this.dialogRef.close(result);
  }

  private loadUsers(): Observable<UserSelectionTableRowAdapter[]> {
    return this.userFacade.getOrganizers()
      .pipe(
        takeWhile(() => this.isAlive),
        map((users: User[]) => users.map(user => this.mapUserToTableAdapter(user))),
      );
  }

  private mapUserToTableAdapter(user: User): UserSelectionTableRowAdapter {
    const isActiveUser =  user.equals(this.activeUser);
    const isPreselected = isActiveUser || this.isPreselected(user);
    return new UserSelectionTableRowAdapter(user, isPreselected, isActiveUser, isActiveUser);
  }

  private isPreselected(user: User): boolean {
    return this.preselectedUsers.find(preselectedUser => user.equals(preselectedUser)) !== undefined;
  }

  private initSelectedUsers() {
    this.selectedUsers = Array.from(this.preselectedUsers);
    if (!this.selectedUsers.find(user => user.equals(this.activeUser))) {
      this.selectedUsers.push(this.activeUser);
    }
  }

}
