import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertService} from '../../../../services/shared/alert.service';
import { MatDialog } from '@angular/material/dialog';
import {OrganizersPickerComponent} from './organizers-picker/organizers-picker.component';
import {TrainingDefinitionPickerComponent} from './training-definition-picker/training-definition-picker.component';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {UserFacade} from '../../../../services/facades/user-facade.service';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {TrainingInstanceFacade} from '../../../../services/facades/training-instance-facade.service';
import {interval} from 'rxjs';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { TrainingInstanceFormGroup } from './training-instance-form-group';

@Component({
  selector: 'kypo2-training-instance-edit',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css']
})
/**
 * Component for creating new or editing existing training instance
 */
export class TrainingInstanceEditComponent extends BaseComponent implements OnInit {

  @Input() trainingInstance: TrainingInstance;
  @Output() trainingChange = new EventEmitter<TrainingInstance>();

  isEditMode: boolean;
  now: Date;

  trainingInstanceFormGroup: TrainingInstanceFormGroup;

  userChangedStartTime = false;
  activeUser: User;


  constructor(
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private userFacade: UserFacade,
    private authService: Kypo2AuthService,
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this. trainingInstanceFormGroup = new TrainingInstanceFormGroup();
    this.resolveInitialInputValues();
    this.initCurrentTimePeriodicalUpdate();
    this.activeUser = this.authService.getActiveUser();
  }

  get startTime() {return this.trainingInstanceFormGroup.startTime;}
  get endTime() {return this.trainingInstanceFormGroup.endTime;}
  get title() {return this.trainingInstanceFormGroup.title;}
  get poolSize() {return this.trainingInstanceFormGroup.poolSize;}
  get organizers() {return this.trainingInstanceFormGroup.organizers;}
  get trainingDefinition() {return this.trainingInstanceFormGroup.trainingDefinition;}
  get accessToken() {return this.trainingInstanceFormGroup.accessToken;}

  /**
   * Opens popup dialog to choose organizers from a list
   */
  chooseOrganizers() {
    const dialogRef = this.dialog.open(OrganizersPickerComponent, { data: this.organizers.value });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingInstanceFormGroup.formGroup.markAsDirty();
        this.organizers.setValue(result.organizers);
      }
    });
  }

  /**
   * Opens popup dialog to choose training definition from a list
   */
  chooseTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionPickerComponent, { data: this.trainingDefinition.value });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingInstanceFormGroup.formGroup.markAsDirty();
        this.trainingDefinition.setValue(result.trainingDef);
      }
    });
  }

  onStartTimeChanged() {
    this.userChangedStartTime = true;
  }

  /**
   * Validates user input, sets input values to training instance object and calls REST API to save the changes in an endpoint
   */
  save() {
    if (this.trainingInstanceFormGroup.formGroup.valid) {
      this.trainingInstanceFormGroup.setInputValuesToTraining(this.trainingInstance);
      if (this.isEditMode) {
        this.updateTrainingInstance();
      } else {
        this.createTrainingInstance();
      }
    }
  }

  private updateTrainingInstance() {
    this.trainingInstanceFacade.updateTrainingInstance(this.trainingInstance)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        newAccessToken => {
          this.alertService.emitAlert(AlertTypeEnum.Success,
            'Changes were successfully saved. Access token is ' + newAccessToken);
          this.trainingInstanceFormGroup.formGroup.markAsPristine();
          this.trainingChanged();
        },
        err => this.errorHandler.displayInAlert(err, 'Updating Training Instance')
      );
  }

  private createTrainingInstance() {
    this.trainingInstanceFacade.createTrainingInstance(this.trainingInstance)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        createdInstance => {
          this.alertService.emitAlert(AlertTypeEnum.Success,
            'Changes were successfully saved.\n Access token is: ' + createdInstance.accessToken);
            this.trainingInstanceFormGroup.formGroup.markAsPristine();
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
      this.trainingInstanceFormGroup.setInputValuesFromTraining(this.trainingInstance);
    } else {
      this.isEditMode = false;
      this.setInputValueForNewInstance();
    }
  }

  private setInputValueForNewInstance() {
    this.trainingInstance = new TrainingInstance();
    this.startTime.setValue(new Date());
    this.startTime.value.setMinutes(this.startTime.value.getMinutes() + 5);
    this.setUpPeriodicTimeStartTimeUpdate();
    this.organizers.setValue([this.authService.getActiveUser()]);
  }

  private setUpPeriodicTimeStartTimeUpdate() {
    interval(60000)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
      if (!this.userChangedStartTime) {
        this.startTime.setValue(new Date(this.startTime.value.setMinutes(this.startTime.value.getMinutes() + 1)));
      }
    });
  }

  private initCurrentTimePeriodicalUpdate() {
    this.now = new Date();
    interval(60000)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(value =>
      this.now = new Date()
    );
  }
}
