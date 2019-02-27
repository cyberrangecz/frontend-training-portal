import {Component, Inject, OnInit, Optional} from '@angular/core';
import {User} from "../../../../../model/user/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {ActiveUserService} from "../../../../../services/active-user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'training-authors-picker',
  templateUrl: './authors-picker.component.html',
  styleUrls: ['./authors-picker.component.css']
})
/**
 * Component of authors picker dialog window. Lets the user to choose from list of authors which will be associated with the training definition
 */
export class AuthorsPickerComponent implements OnInit {

  authors: User[];
  selectedAuthors: User[] = [];
  activeUser: User;
  isLoading = true;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public preselectedUsers: User[],
    public dialogRef: MatDialogRef<AuthorsPickerComponent>,
    private userFacade: UserFacade,
    private activeUserService: ActiveUserService) {

  }

  ngOnInit() {
    this.activeUser = this.activeUserService.getActiveUser();
    this.selectedAuthors.push(this.activeUser);
    this.getAuthors();
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      authors: this.selectedAuthors
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

  selectionEquality(a: User, b: User): boolean {
    return a.login == b.login;
  }

  private getAuthors() {
    this.userFacade.getDesigners()
      .pipe(map(authors => authors
        .filter(author => author.login !== this.activeUser.login)))
      .subscribe(result => {
        this.authors = result;
        this.initializeSelectedUsers();
        this.isLoading = false;
      });
  }

  private initializeSelectedUsers() {
    if (this.preselectedUsers && this.preselectedUsers.length > 0) {
      const preselectedLogins = this.preselectedUsers.map(user => user.login);
      const toSelect = this.authors.filter(author => preselectedLogins.includes(author.login));
      this.selectedAuthors.push(...toSelect);
    }
  }
}
