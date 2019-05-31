import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {AlertService} from "../../../../services/shared/alert.service";
import {MatDialog} from "@angular/material";
import {OrganizersPickerComponent} from "./organizers-picker/organizers-picker.component";
import {TrainingDefinitionPickerComponent} from "./training-definition-picker/training-definition-picker.component";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {UserFacade} from "../../../../services/facades/user-facade.service";
import {TrainingDefinitionFacade} from "../../../../services/facades/training-definition-facade.service";
import {AlertTypeEnum} from "../../../../model/enums/alert-type.enum";
import {ActiveUserService} from "../../../../services/shared/active-user.service";
import {TrainingInstanceFacade} from "../../../../services/facades/training-instance-facade.service";
import {User} from '../../../../model/user/user';
import {interval, Subscription} from 'rxjs';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';

@Component({
  selector: 'training-instance-definition',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css']
})
/**
 * Component for creating new or editing existing training instance
 */
export class TrainingInstanceEditComponent implements OnInit, OnDestroy {

  @Input('trainingInstance') trainingInstance: TrainingInstance;
  @Output('trainingChange') trainingChange = new EventEmitter<TrainingInstance>();

  isEditMode: boolean;
  dirty: boolean;
  now: Date;

  title: string;
  startTime: Date;
  endTime: Date;
  poolSize: number;
  organizers: User[];
  trainingDefinition: TrainingDefinition;
  accessToken: string;

  startTimeUpdateSubscription: Subscription;
  userChangedStartTime = false;

  loggedUserLogin: string;

  private _currentTimeUpdateSubscription: Subscription;


  constructor(
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private userFacade: UserFacade,
    private activeUserService: ActiveUserService,
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.resolveInitialInputValues();
    this.initCurrentTimePeriodicalUpdate();
    this.dirty = false;
    this.loggedUserLogin = this.activeUserService.getActiveUser().login;
  }

  ngOnDestroy(): void {
    if (this.startTimeUpdateSubscription) {
      this.startTimeUpdateSubscription.unsubscribe();
    }
    if (this._currentTimeUpdateSubscription) {
      this._currentTimeUpdateSubscription.unsubscribe();
    }
  }

  /**
   * Opens popup dialog to choose organizers from a list
   */
  chooseOrganizers() {
    const dialogRef = this.dialog.open(OrganizersPickerComponent, { data: this.organizers });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.organizers = result.organizers;
        this.contentChanged();
      }
    });
  }

  /**
   * Opens popup dialog to choose training definition from a list
   */
  chooseTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionPickerComponent, { data: this.trainingDefinition });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingDefinition = result.trainingDef;
        this.contentChanged();
      }
    });
  }

  onStartTimeNgModelChanged() {
    this.userChangedStartTime = true;
    this.contentChanged();
  }

  /**
   * Validates user input, sets input values to training instance object and calls REST API to save the changes in an endpoint
   */
  save() {
    if (this.validateInputValues()) {
      this.setInputValuesToTraining();
      if (this.isEditMode) {
        this.updateTrainingInstance();
      } else {
        this.createTrainingInstance();
      }
    }
  }

  contentChanged() {
    this.dirty = true;
  }

  private updateTrainingInstance() {
    this.trainingInstanceFacade.updateTrainingInstance(this.trainingInstance)
      .subscribe(
        newAccessToken => {
          this.alertService.emitAlert(AlertTypeEnum.Success,
            'Changes were successfully saved. Access token is ' + newAccessToken);
          this.dirty = false;
          this.trainingChanged();
      },
        err => this.errorHandler.displayInAlert(err, 'Updating Training Instance')
      );
  }

  private createTrainingInstance() {
    this.trainingInstanceFacade.createTrainingInstance(this.trainingInstance)
      .subscribe(
        createdInstance => {
          this.alertService.emitAlert(AlertTypeEnum.Success,
            'Changes were successfully saved.\n Access token is: ' + createdInstance.accessToken);
          this.dirty = false;
          this.trainingChanged();
        },
        err => this.errorHandler.displayInAlert(err, 'Saving Training Instance')
      );
  }

  /**
   * Emits event when training instance is saved
   */
  trainingChanged() {
    this.trainingChange.emit();
  }

  /**
   * Resolves whether user is editing existing training or creating new and sets initial values accordingly
   */
  private resolveInitialInputValues() {
    if (this.trainingInstance) {
      this.isEditMode = true;
      this.setInputValuesFromTraining()
    } else {
      this.isEditMode =false;
      this.setInputValueForNewInstance();
    }
  }

  /**
   * Validates user input. Displays error message if errors are found
   * @returns {boolean} true if user input passes the validation, false otherwise
   */
  private validateInputValues(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.poolSize || this.poolSize < 1 || this.poolSize > 100) {
      errorMessage += 'Pool size must be number in range from 1 to 100\n'
    }

    if (!this.accessToken || this.accessToken.replace(/\s/g, '') === '') {
      errorMessage += 'Access token cannot be empty\n'
    }

    if (!this.organizers || this.organizers.length <= 0) {
      errorMessage += 'Organizers must not be empty\n'
    }

    if (!this.trainingDefinition) {
      errorMessage += 'Training definition must not be empty\n'
    }

    if (!this.startTime) {
      errorMessage += 'Start time must not be empty\n'
    }
    else if (this.startTime > this.endTime) {
      errorMessage += 'Start time must be before end time\n'
    }

    if (!this.endTime) {
      errorMessage += 'End time must not be empty\n'
    } else if (this.startTime.valueOf() < Date.now() || this.endTime.valueOf() < Date.now()) {
      errorMessage += 'Start time and end time cannot be in the past\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  private setInputValuesToTraining() {
    this.trainingInstance.startTime = this.startTime;
    this.trainingInstance.endTime = this.endTime;
    this.trainingInstance.title = this.title;
    this.trainingInstance.poolSize = this.poolSize;
    this.trainingInstance.organizers = this.organizers;
    this.trainingInstance.trainingDefinition = this.trainingDefinition;
    this.trainingInstance.accessToken = this.accessToken;
  }

  /**
   * Sets initial input values from passed training instance object (edit mode)
   */
  private setInputValuesFromTraining() {
    this.startTime = this.trainingInstance.startTime;
    this.endTime = this.trainingInstance.endTime;
    this.title = this.trainingInstance.title;
    this.poolSize = this.trainingInstance.poolSize;
    this.organizers = this.trainingInstance.organizers;
    this.trainingDefinition = this.trainingInstance.trainingDefinition;
    this.accessToken = this.trainingInstance.accessToken;

  }

  private setInputValueForNewInstance() {
    this.trainingInstance = new TrainingInstance();
    this.startTime = new Date();
    this.startTime.setMinutes(this.startTime.getMinutes() + 5);
    this.setUpPeriodicTimeStartTimeUpdate();
    this.organizers = [this.activeUserService.getActiveUser()];
  }

  private setUpPeriodicTimeStartTimeUpdate() {
    const source = interval(60000);
    this.startTimeUpdateSubscription = source.subscribe( () => {
      if (!this.userChangedStartTime) {
        this.startTime.setMinutes(this.startTime.getMinutes() + 1);
      }
    });
  }

  private initCurrentTimePeriodicalUpdate() {
    this.now = new Date();
    this._currentTimeUpdateSubscription = interval(60000).subscribe(value =>
      this.now = new Date()
    );
  }
}
