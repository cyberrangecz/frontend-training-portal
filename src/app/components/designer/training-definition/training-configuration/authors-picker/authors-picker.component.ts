import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../model/user/user";
import {Observable} from "rxjs/internal/Observable";
import {MatDialogRef} from "@angular/material";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {ActiveUserService} from "../../../../../services/active-user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'training-authors-chooser',
  templateUrl: './authors-picker.component.html',
  styleUrls: ['./authors-picker.component.css']
})
/**
 * Component of authors picker dialog window. Lets the user to choose from list of authors which will be associated with the training definition
 */
export class AuthorsPickerComponent implements OnInit {

  authors$: Observable<User[]>;
  selectedAuthors: User[] = [];
  activeUser: User;

  constructor(
    public dialogRef: MatDialogRef<AuthorsPickerComponent>,
    private userFacade: UserFacade,
    private activeUserService: ActiveUserService) {
      this.activeUser = this.activeUserService.getActiveUser();
      this.selectedAuthors.push(this.activeUser);
  }

  ngOnInit() {
    this.authors$ = this.userFacade.getDesigners()
      .pipe(map(authors => authors
        .filter(author => author.login !== this.activeUser.login)));
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
}
