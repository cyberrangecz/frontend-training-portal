import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {map} from "rxjs/operators";
import {BetaTestingGroup} from "../../../../../model/user/beta-testing-group";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {AlertService} from "../../../../../services/shared/alert.service";
import {ActiveUserService} from "../../../../../services/shared/active-user.service";
import {User} from '../../../../../model/user/user';

@Component({
  selector: 'app-edit-beta-testing-group',
  templateUrl: './edit-beta-testing-group.component.html',
  styleUrls: ['./edit-beta-testing-group.component.css']
})
export class EditBetaTestingGroupComponent implements OnInit {

  organizers: User[];
  activeUser: User;
  selectedOrganizers: User[] = [];
  activeUserIsOrganizer: boolean;
  editMode: boolean;
  isLoading = true;

  constructor(public dialogRef: MatDialogRef<EditBetaTestingGroupComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public betaTestingGroup: BetaTestingGroup,
              private activeUserService: ActiveUserService,
              private alertService: AlertService,
              private userFacade: UserFacade) {
  }

  ngOnInit() {
    this.resolveMode();
    this.initializeOrganizers();
    this.initializeActiveUser();
    this.initializeInputs();
  }

  confirm() {
    if (this.validateInput()) {
      this.setInputValuesToViewGroup();
      const result = {
        type: 'confirm',
        betaTestingGroup: this.betaTestingGroup
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    const result = {
      type: 'cancel',
      betaTestingGroup: null
    };
    this.dialogRef.close(result);
  }

  selectionEquality(a: User, b: User): boolean {
    return a.login == b.login;
  }

  private initializeInputs() {
    if (this.editMode) {
      this.selectedOrganizers = this.betaTestingGroup.organizers;
    } else {
      this.betaTestingGroup = new BetaTestingGroup();
    }
  }

  private validateInput(): boolean {
    let errorMessage: string = '';

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
    this.betaTestingGroup.organizers = this.selectedOrganizers;
  }

  private initializeActiveUser() {
    this.activeUser = this.activeUserService.getActiveUser();
    this.activeUserIsOrganizer = this.activeUserService.isOrganizer();
  }

  private initializeOrganizers() {
    this.userFacade.getOrganizers()
      .pipe(map(users => {
        const filteredUsers = users.filter(user => user.login !== this.activeUser.login);
        if (this.editMode) {
          this.preselectOrganizers(this.findInitiallyPreselectedUsers(filteredUsers))
        }
        return filteredUsers;
      }))
      .subscribe(users => {
        this.organizers = users;
        this.isLoading = false;
      });
  }

  private resolveMode() {
    this.editMode = this.betaTestingGroup !== null && this.betaTestingGroup !== undefined;
  }

  private findInitiallyPreselectedUsers(organizers: User[]): User[] {
    const userLoginsInEditedBetaTestingGroup = this.betaTestingGroup.organizers.map(organizer => organizer.login);
    const result = organizers.filter(user => userLoginsInEditedBetaTestingGroup.includes(user.login));
    if (userLoginsInEditedBetaTestingGroup.includes(this.activeUser.login)) {
      result.push(this.activeUser);
    }
    return result;
  }

  private preselectOrganizers(users: User[]) {
      this.selectedOrganizers.push(...users);
  }
}
