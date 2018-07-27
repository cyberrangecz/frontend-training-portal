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

@Component({
  selector: 'training-instance-definition',
  templateUrl: './training-instance-definition.component.html',
  styleUrls: ['./training-instance-definition.component.css']
})
export class TrainingInstanceDefinitionComponent implements OnInit, OnChanges {

  @Input('trainingInstance') trainingInstance: TrainingInstance;
  @Output('trainingChange') trainingChange = new EventEmitter();

  title: string;
  startTime: Date = new Date();
  endTime: Date = new Date();
  poolSize: number;
  organizers: User[];
  trainingDefinition: TrainingDefinition;


  constructor(
    private alertService: AlertService,
    private userGetter: UserGetterService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.resolveInputTrainingInstance();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.resolveInputTrainingInstance();
    }
  }

  chooseOrganizers() {
    const dialogRef = this.dialog.open(OrganizersPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.organizers = result.organizers;
      }
    });
  }

  chooseTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingDefinition = result.trainingDef;
      }
    });
  }

  saveChanges() {
    if (this.validateInputValues()) {
      this.setInputValuesToTraining();
      console.log(this.trainingInstance);
      // save in REST
      this.trainingChanged();
    }
  }

  trainingChanged() {
    this.trainingChange.emit();
  }

  private resolveInputTrainingInstance() {
    if (this.trainingInstance) {
      this.setInputValuesFromTraining()
    } else {
      this.createNewTrainingInstance();
    }
  }

  private validateInputValues(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.poolSize || this.poolSize < 1 || this.poolSize > 100) {
      errorMessage += 'Pool size must be number in range from 1 to 100\n'
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

  private setInputValuesToTraining() {
    this.trainingInstance.startTime = this.startTime;
    this.trainingInstance.endTime = this.endTime;
    this.trainingInstance.title = this.title;
    this.trainingInstance.poolSize = this.poolSize;
    this.trainingInstance.organizersIds = this.organizers.map(user => user.id);
    this.trainingInstance.trainingDefinitionId = this.trainingDefinition.id;
  }

  private setInputValuesFromTraining() {
    this.startTime = this.trainingInstance.startTime;
    this.endTime = this.trainingInstance.endTime;
    this.title = this.trainingInstance.title;
    this.poolSize = this.trainingInstance.poolSize;
    this.userGetter.loadUsersByIds(this.trainingInstance.organizersIds)
      .subscribe(organizers => this.organizers = organizers);
    this.trainingDefinitionGetter.getTrainingDefById(this.trainingInstance.trainingDefinitionId)
      .subscribe(trainingDef => this.trainingDefinition = trainingDef);

  }

  private createNewTrainingInstance() {
    this.trainingInstance = new TrainingInstance(null, new Date(), new Date(), null, [], '');
  }
}
