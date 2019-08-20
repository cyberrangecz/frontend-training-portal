import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {UserFacade} from "../../../../../services/facades/user-facade.service";
import {map, takeWhile} from "rxjs/operators";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {AlertService} from "../../../../../services/shared/alert.service";
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BetaTestingGroup} from '../../../../../model/training/beta-testing-group';
import {BaseComponent} from "../../../../base.component";
import {Observable} from "rxjs";
import {UserSelectionTableAdapter} from "../../../../../model/table-adapters/user-selection-table-adapter";

@Component({
  selector: 'app-edit-beta-testing-group',
  templateUrl: './edit-beta-testing-group.component.html',
  styleUrls: ['./edit-beta-testing-group.component.css']
})
export class EditBetaTestingGroupComponent extends BaseComponent implements OnInit {

  users$: Observable<UserSelectionTableAdapter[]>;
  activeUser: User;
  selectedUsers: User[] = [];
  editMode: boolean;

  constructor(public dialogRef: MatDialogRef<EditBetaTestingGroupComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public betaTestingGroup: BetaTestingGroup,
              private authService: Kypo2AuthService,
              private alertService: AlertService,
              private userFacade: UserFacade) {
    super();
  }

  ngOnInit() {
    this.resolveMode();
    this.activeUser = this.authService.isTrainingOrganizer() ? this.authService.getActiveUser() : undefined;
    this.initBetaTestingGroup();
    this.users$ = this.loadUsers();
  }

  onSelectionChange(users: User[]) {
    this.selectedUsers = users;
  }

  confirm() {
    if (this.validateInput()) {
      this.setInputValuesToBetaTestingGroup();
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

  private initBetaTestingGroup() {
    if (!this.editMode) {
      this.betaTestingGroup = new BetaTestingGroup();
    }
    this.selectedUsers = Array.from(this.betaTestingGroup.organizers);
  }

  private validateInput(): boolean {
    let errorMessage: string = '';
    if (!this.selectedUsers || this.selectedUsers.length === 0) {
      errorMessage += 'Organizers cannot be empty\n';
    }
    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  private setInputValuesToBetaTestingGroup() {
    this.betaTestingGroup.organizers = Array.from(this.selectedUsers);
  }

  private loadUsers(): Observable<UserSelectionTableAdapter[]> {
    return this.userFacade.getDesigners()
      .pipe(
        takeWhile(() => this.isAlive),
        map((users: User[]) => users.map(user => this.mapUserToTableAdapter(user))),
      )
  }

  private mapUserToTableAdapter(user: User): UserSelectionTableAdapter {
    const isActiveUser =  user.equals(this.activeUser);
    const isPreselected = this.isPreselected(user);
    return new UserSelectionTableAdapter(user, isPreselected, isActiveUser, false);
  }

  private isPreselected(user: User): boolean {
    return this.betaTestingGroup.organizers.find(preselectedUser => user.equals(preselectedUser)) !== undefined;
  }

  private resolveMode() {
    this.editMode = this.betaTestingGroup !== null && this.betaTestingGroup !== undefined;
  }
}
