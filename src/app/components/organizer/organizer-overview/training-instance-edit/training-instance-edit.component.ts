import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {AlertService} from "../../../../services/event-services/alert.service";
import {MatDialog} from "@angular/material";
import {OrganizersPickerComponent} from "./organizers-picker/organizers-picker.component";
import {TrainingDefinitionPickerComponent} from "./training-definition-picker/training-definition-picker.component";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {UserFacade} from "../../../../services/facades/user-facade.service";
import {TrainingDefinitionFacade} from "../../../../services/facades/training-definition-facade.service";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {ActiveUserService} from "../../../../services/active-user.service";
import {TrainingInstanceFacade} from "../../../../services/facades/training-instance-facade.service";

@Component({
  selector: 'training-instance-definition',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css']
})
/**
 * Component for creating new or editing existing training instance
 */
export class TrainingInstanceEditComponent implements OnInit {

  @Input('trainingInstance') trainingInstance: TrainingInstance;
  @Output('trainingChange') trainingChange = new EventEmitter<TrainingInstance>();

  editMode: boolean;

  startAt: Date = new Date();

  title: string;
  startTime: Date;
  endTime: Date;
  poolSize: number;
  organizers: string[];
  trainingDefinition: TrainingDefinition;
  accessToken: string;


  constructor(
    private alertService: AlertService,
    private userFacade: UserFacade,
    private activeUserService: ActiveUserService,
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.resolveInitialInputValues();
  }
  /**
   * Opens popup dialog to choose organizers from a list
   */
  chooseOrganizers() {
    const dialogRef = this.dialog.open(OrganizersPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.organizers = result.organizers;
      }
    });
  }

  /**
   * Opens popup dialog to choose training definition from a list
   */
  chooseTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingDefinition = result.trainingDef;
      }
    });
  }

  /**
   * Validates user input, sets input values to training instance object and calls REST API to save the changes in an endpoint
   */
  saveChanges() {
    if (this.validateInputValues()) {
      this.setInputValuesToTraining();
      if (this.editMode) {
        this.trainingInstanceFacade.updateTrainingInstance(this.trainingInstance)
          .subscribe(response => {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.');
            this.trainingChanged();
            },
            (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Changes were not saved.')
          );
      } else {
        this.trainingInstanceFacade.createTrainingInstance(this.trainingInstance)
          .subscribe(response => {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.');
            this.trainingChanged();
            },
            (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Changes were not saved.')
          );
      }
    }
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
      this.editMode = true;
      this.setInputValuesFromTraining()
    } else {
      this.editMode =false;
      this.createNewTrainingInstance();
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
      errorMessage += 'Password cannot be empty\n'
    }

    if (!this.organizers) {
      errorMessage += 'Organizers must not be empty\n'
    }

    if (!this.trainingDefinition) {
      errorMessage += 'Training definition must not be empty\n'
    }

    if (!this.startTime) {
      errorMessage += 'Start time must not be empty\n'
    }

    if (!this.endTime) {
      errorMessage += 'End time must not be empty\n'
    }

    if (this.startTime > this.endTime) {
      errorMessage += 'Start time must be before end time\n'
    }

    if (this.startTime.valueOf() < Date.now() || this.endTime.valueOf() < Date.now()) {
      errorMessage += 'Start time and end time cannot be in the past\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  /**
   * Sets user input values to the training instance object
   */
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

  /**
   * Creates new object of training instance with default values
   */
  private createNewTrainingInstance() {
    this.trainingInstance = new TrainingInstance();
    this.organizers = [this.activeUserService.getActiveUser().login];
  }
}
