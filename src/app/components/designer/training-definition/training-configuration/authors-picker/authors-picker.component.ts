import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {map, takeWhile} from "rxjs/operators";
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BaseComponent} from "../../../../base.component";
import {Observable} from "rxjs";
import {UserSelectionTableAdapter} from "../../../../../model/table-adapters/user-selection-table-adapter";

@Component({
  selector: 'training-authors-picker',
  templateUrl: './authors-picker.component.html',
  styleUrls: ['./authors-picker.component.css']
})
/**
 * Component of authors picker dialog window. Lets the user to choose from list of authors which will be associated with the training definition
 */
export class AuthorsPickerComponent extends BaseComponent implements OnInit {

  users$: Observable<UserSelectionTableAdapter[]>;
  selectedUsers: User[] = [];
  activeUser: User;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public preselectedUsers: User[],
              public dialogRef: MatDialogRef<AuthorsPickerComponent>,
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
      authors: this.selectedUsers
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      authors: null
    };
    this.dialogRef.close(result);
  }

  private loadUsers(): Observable<UserSelectionTableAdapter[]> {
    return this.userFacade.getDesigners()
      .pipe(
        takeWhile(() => this.isAlive),
        map((users: User[]) => users.map(user => this.mapUserToTableAdapter(user)))
      )
  }

  private mapUserToTableAdapter(user: User): UserSelectionTableAdapter {
    const isActiveUser =  user.equals(this.activeUser);
    const isPreselected = isActiveUser || this.isPreselected(user);
    return new UserSelectionTableAdapter(user, isPreselected, isActiveUser, isActiveUser);
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
