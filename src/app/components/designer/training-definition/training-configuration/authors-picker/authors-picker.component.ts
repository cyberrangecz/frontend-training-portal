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

  confirm() {

    const result = {
      type: 'confirm',
      authors: this.selectedAuthors
    };
    this.dialogRef.close(result);
  }

  cancel() {
    const result = {
      type: 'cancel',
      authors: null
    };
    this.dialogRef.close(result);
  }
}
