import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {map} from "rxjs/operators";
import {ViewGroup} from "../../../../../model/user/view-group";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {ActiveUserService} from "../../../../../services/active-user.service";
import {UserRoleEnum} from "../../../../../enums/user-role.enum";

@Component({
  selector: 'app-edit-view-group',
  templateUrl: './edit-view-group.component.html',
  styleUrls: ['./edit-view-group.component.css']
})
export class EditViewGroupComponent implements OnInit {

  title: string;
  description: string;
  organizers$: Observable<string[]>;
  activeUser: string;
  selectedOrganizers: string[] = [];
  editMode: boolean;

  constructor(public dialogRef: MatDialogRef<EditViewGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public viewGroup: ViewGroup,
              private activeUserService: ActiveUserService,
              private alertService: AlertService,
              private userFacade: UserFacade) {
  }

  ngOnInit() {
    this.initializeActiveUser();
    this.initializeOrganizers();
    this.initializeInputs();
  }

  confirm() {
    if (this.validateInput()) {
      this.setInputValuesToViewGroup();
      const result = {
        type: 'confirm',
        viewGroup: this.viewGroup
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    const result = {
      type: 'cancel',
      viewGroup: null
    };
    this.dialogRef.close(result);
  }

  private initializeInputs() {
    if (this.editMode) {
      this.title = this.viewGroup.description;
      this.description = this.viewGroup.description;
      this.selectedOrganizers = this.viewGroup.organizers as string[];
    } else {
      this.viewGroup = new ViewGroup();
    }
  }

  private validateInput(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }
    if (!this.description || this.description.replace(/\s/g, '') === '') {
      errorMessage += 'Description cannot be empty\n'
    }
    if (!this.selectedOrganizers || this.selectedOrganizers.length === 0) {
      errorMessage += 'Organizers cannot be empty\n';
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  private setInputValuesToViewGroup() {
    this.viewGroup.title = this.title;
    this.viewGroup.description = this.description;
    this.viewGroup.organizers = this.selectedOrganizers;
  }

  private initializeActiveUser() {
    const user = this.activeUserService.getActiveUser();
    if (user.roles.contains(UserRoleEnum.Organizer)) {
      this.activeUser = this.activeUserService.getActiveUser().login;
    }
  }

  private initializeOrganizers() {
    this.organizers$ = this.userFacade.getOrganizers()
      .pipe(map(users => users
        .filter(user => user.login === this.activeUser)
        .map(user => user.login )));
  }
}
