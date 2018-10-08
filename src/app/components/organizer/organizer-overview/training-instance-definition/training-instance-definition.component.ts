import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {User} from "../../../../model/user/user";
import {AlertService} from "../../../../services/event-services/alert.service";
import {MatDialog} from "@angular/material";
import {OrganizersPickerComponent} from "./organizers-picker/organizers-picker.component";
import {TrainingDefinitionPickerComponent} from "./training-definition-picker/training-definition-picker.component";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {UserGetterService} from "../../../../services/data-getters/user-getter.service";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {TrainingInstanceSetterService} from "../../../../services/data-setters/training-instance-setter.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'training-instance-definition',
  templateUrl: './training-instance-definition.component.html',
  styleUrls: ['./training-instance-definition.component.css']
})
/**
 * Component for creating new or editing existing training instance
 */
export class TrainingInstanceDefinitionComponent implements OnInit, OnChanges {

  @Input('trainingInstance') trainingInstance: TrainingInstance;
  @Output('trainingChange') trainingChange = new EventEmitter<TrainingInstance>();

  editMode: boolean;

  title: string;
  startTime: Date = new Date();
  endTime: Date = new Date();
  poolSize: number;
  organizers: User[];
  trainingDefinition: TrainingDefinition;
  password: string;


  constructor(
    private alertService: AlertService,
    private userGetter: UserGetterService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private trainingInstanceSetter: TrainingInstanceSetterService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.resolveInitialInputValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.resolveInitialInputValues();
    }
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
        this.trainingInstanceSetter.updateTrainingInstance(this.trainingInstance)
          .subscribe(response => this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.'),
            (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Changes were not saved.')
          );
      } else {
        this.trainingInstanceSetter.addTrainingInstance(this.trainingInstance)
          .subscribe(response => this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.'),
            (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Changes were not saved.')
          );
      }
      this.trainingChanged();
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

    if (!this.password || this.password.replace(/\s/g, '') === '') {
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
    this.trainingInstance.organizersIds = this.organizers.map(user => user.id);
    this.trainingInstance.trainingDefinitionId = this.trainingDefinition.id;
    this.trainingInstance.keyword = this.password;
  }

  /**
   * Sets initial input values from passed training instance object (edit mode)
   */
  private setInputValuesFromTraining() {
    this.startTime = this.trainingInstance.startTime;
    this.endTime = this.trainingInstance.endTime;
    this.title = this.trainingInstance.title;
    this.poolSize = this.trainingInstance.poolSize;
    this.userGetter.loadUsersByIds(this.trainingInstance.organizersIds)
      .subscribe(organizers => this.organizers = organizers);
    this.trainingDefinitionGetter.getTrainingDefById(this.trainingInstance.trainingDefinitionId)
      .subscribe(trainingDef => this.trainingDefinition = trainingDef);
    this.password = this.trainingInstance.keyword;

  }

  /**
   * Creates new object of training instance with default values
   */
  private createNewTrainingInstance() {
    this.trainingInstance = new TrainingInstance(null, new Date(), new Date(), null, [], '');
  }
}
