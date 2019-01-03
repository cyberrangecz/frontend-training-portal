import { Component, OnInit } from '@angular/core';
import {UserGetterService} from "../../../../../services/data-getters/user-getter.service";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../../../../../model/user/user";
import {MatDialogRef} from "@angular/material";
import {UserRoleEnum} from "../../../../../enums/user-role.enum";
import {ActiveUserService} from "../../../../../services/active-user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'organizers-picker',
  templateUrl: './organizers-picker.component.html',
  styleUrls: ['./organizers-picker.component.css']
})
/**
 * Component of popup dialog to choose from a list of possible organizers of the training instance
 */
export class OrganizersPickerComponent implements OnInit {

  organizers$: Observable<User[]>;
  selectedOrganizers: User[] = [];
  activeUser: User;

  constructor(
    public dialogRef: MatDialogRef<OrganizersPickerComponent>,
    private userGetter: UserGetterService,
    private activeUserService: ActiveUserService) {
    this.activeUser = this.activeUserService.getActiveUser();
    this.selectedOrganizers.push(this.activeUser);
  }

  ngOnInit() {
    this.organizers$ = this.userGetter.loadUsersByRoles([UserRoleEnum.Organizer])
      .pipe(map(organizers =>
        organizers
          .filter(organizer => organizer.id !== this.activeUser.id)));
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      organizers: this.selectedOrganizers
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

}
