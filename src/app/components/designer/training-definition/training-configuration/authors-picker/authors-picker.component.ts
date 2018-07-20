import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../model/user/user";
import {Observable} from "rxjs/internal/Observable";
import {MatDialogRef} from "@angular/material";
import {UserGetterService} from "../../../../../services/data-getters/user-getter.service";
import {UserRoleEnum} from "../../../../../enums/user-role.enum";

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
  selectedAuthors: User[];

  constructor(
    public dialogRef: MatDialogRef<AuthorsPickerComponent>,
    private userGetter: UserGetterService) {
  }

  ngOnInit() {
    this.authors$ = this.userGetter.loadUsersByRoles([UserRoleEnum.Designer]);
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
