import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {AlertService} from '../../../../services/shared/alert.service';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {SandboxDefinitionPickerComponent} from './sandbox-definition-picker/sandbox-definition-picker.component';
import { MatDialog } from '@angular/material/dialog';
import {AuthorsPickerComponent} from './authors-picker/authors-picker.component';
import {UserFacade} from '../../../../services/facades/user-facade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {EditBetaTestingGroupComponent} from './edit-beta-testing-group/edit-beta-testing-group.component';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BetaTestingGroup} from '../../../../model/training/beta-testing-group';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { TrainingConfigurationFormGroup } from './training-configuration-form-group';

/**
 * Component for creating new or editing already existing training definition
 */
@Component({
  selector: 'kypo2-training-definition-edit',
  templateUrl: './training-definition-edit.component.html',
  styleUrls: ['./training-definition-edit.component.css']
})
export class TrainingDefinitionEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('trainingDefinition') trainingDefinition: TrainingDefinition;
  @Output('isTrainingSaved') savedTrainingChange = new EventEmitter<boolean>();
  @Output('trainingDefId') idChange = new EventEmitter<number>();

  editMode: boolean;

  trainingConfigurationFormGroup: TrainingConfigurationFormGroup;

  dirty = false;
  activeUser: User;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService,
              private userFacade: UserFacade,
              private authService: Kypo2AuthService,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
  }

  ngOnInit() {
    this.activeUser = this.authService.getActiveUser();
  }

  get title() {
    return this.trainingConfigurationFormGroup.formGroup.get("title");
  }
  get description() {
    return this.trainingConfigurationFormGroup.formGroup.get("description");
  }
  get prerequisites() {
    return this.trainingConfigurationFormGroup.formGroup.get("prerequisites");
  }
  get outcomes() {
    return this.trainingConfigurationFormGroup.formGroup.get("outcomes");
  }
  get authors() {
    return this.trainingConfigurationFormGroup.formGroup.get("authors");
  }
  get sandboxDefId() {
    return this.trainingConfigurationFormGroup.formGroup.get("sandboxDefId");
  }
  get showProgress() {
    return this.trainingConfigurationFormGroup.formGroup.get("showProgress");
  }
  get betaTestingGroup() {
    return this.trainingConfigurationFormGroup.formGroup.get(
      "betaTestingGroup"
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.trainingConfigurationFormGroup) {
      this.trainingConfigurationFormGroup = new TrainingConfigurationFormGroup();
    }
    if ("trainingDefinition" in changes) {
      this.resolveInitialTraining();
    }
  }

  /**
   * Checks if all changes are saved and if user can navigate to another component
   * @returns {boolean} true if all changes are saved, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  /**
   * Displays dialog window with list of authors and assigns selected authors to the training definition
   */
  chooseAuthors() {
    const dialogRef = this.dialog.open(AuthorsPickerComponent, {
      data: this.authors.value
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === "confirm") {
          this.authors.setValue(result.authors);
          this.dirty = true;
        }
      });
  }

  chooseBetaTestingGroup() {
    const dialogRef = this.dialog.open(EditBetaTestingGroupComponent, {
      data: this.betaTestingGroup.value
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.betaTestingGroup.setValue(result.betaTestingGroup);
        this.dirty = true;
      }
    });
  }

  /**
   * Displays dialog window with list of sandbox definitions and assigns selected sandbox definition to the training definition
   */
  chooseSandboxDefs() {
    const dialogRef = this.dialog.open(SandboxDefinitionPickerComponent, {
      data: this.sandboxDefId.value
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === "confirm") {
          this.sandboxDefId.setValue(result.sandboxDef.id);
          this.dirty = true;
        }
      });
  }

  /**
   * Saves created or edited training definition, validates the input and send request to save the training definition in database
   */
  saveTrainingDef() {
    if (this.trainingConfigurationFormGroup.formGroup.valid) {
      this.setInputValuesToTrainingDef();
      this.sendRequestToSaveChanges();
    }
  }

  private performActionsAfterSuccessfulSave(id: number) {
    if (
      this.trainingDefinition.id === undefined ||
      this.trainingDefinition.id == null
    ) {
      this.trainingDefinition.id = id;
      this.idChange.emit(id);
    }
    this.savedTrainingChange.emit(true);
    this.dirty = false;
    this.resolveModeAfterSuccessfulSave();
  }

  private resolveModeAfterSuccessfulSave() {
    if (!this.editMode) {
      this.router.navigate(['./../', this.trainingDefinition.id], {relativeTo: this.activeRoute.parent});
    }
    if (!this.editMode) {
      this.editMode = true;
    }
  }

  /**
   * Sends request to endpoint to save changes in edited training definition or to create a new one based on currently active mode
   */
  private sendRequestToSaveChanges() {
    if (this.editMode) {
      this.updateTrainingDefinition();
    } else {
      this.createTrainingDefinition();
    }
  }

  private updateTrainingDefinition() {
    this.trainingDefinitionFacade
      .updateTrainingDefinition(this.trainingDefinition)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        response => {
          this.alertService.emitAlert(
            AlertTypeEnum.Success,
            "Changes were successfully saved."
          );
          this.performActionsAfterSuccessfulSave(response);
        },
        err =>
          this.errorHandler.displayInAlert(err, "Editing training definition")
      );
  }

  private createTrainingDefinition() {
    this.trainingDefinitionFacade
      .createTrainingDefinition(this.trainingDefinition)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        response => {
          this.alertService.emitAlert(
            AlertTypeEnum.Success,
            "Training was successfully saved."
          );
          this.performActionsAfterSuccessfulSave(response);
        },
        err => this.errorHandler.displayInAlert(err, 'Creating new training definition')
      );
  }

  /**
   * Resolves whether the training definition passed from parent component is null (create new) or not (edit existing)
   */
  private resolveInitialTraining() {
    if (!this.trainingDefinition) {
      this.editMode = false;
      this.initValuesForNewTraining();
      this.trainingDefinition = new TrainingDefinition();
      this.showProgress.setValue(true);
    } else {
      this.editMode = true;
      this.initValuesForEdit();
    }
  }

  /**
   * Sets initial values of input elements if new training definition is created
   */
  private initValuesForNewTraining() {
    this.title.setValue("");
    this.description.setValue("");
    this.prerequisites.setValue([""]);
    this.outcomes.setValue([""]);
    this.betaTestingGroup.setValue(null);
    this.authors.setValue([this.authService.getActiveUser()]);
  }

  /**
   * Sets initial values of input elements if existing training definition is edited
   */
  private initValuesForEdit() {
    this.title.setValue(this.trainingDefinition.title);
    this.description.setValue(this.trainingDefinition.description);
    this.prerequisites.setValue(this.trainingDefinition.prerequisites);
    this.outcomes.setValue(this.trainingDefinition.outcomes);
    this.showProgress.setValue(this.trainingDefinition.showStepperBar);
    this.betaTestingGroup.setValue(this.trainingDefinition.betaTestingGroup);
    if (!this.prerequisites) { this.prerequisites.setValue(['']); }
    if (!this.outcomes) { this.outcomes.setValue(['']); }
    this.authors.setValue(this.trainingDefinition.authors);
    this.sandboxDefId.setValue(this.trainingDefinition.sandboxDefinitionId);
  }

  /**
   * Sets validated values from user input to the training definition object
   */
  private setInputValuesToTrainingDef() {
    this.trainingDefinition.sandboxDefinitionId = this.sandboxDefId.value;
    this.trainingDefinition.title = this.title.value;
    this.trainingDefinition.authors = this.authors.value;
    this.trainingDefinition.description = this.description.value;
    this.trainingDefinition.prerequisites = this.prerequisites.value;
    this.trainingDefinition.outcomes = this.outcomes.value;
    this.trainingDefinition.showStepperBar = this.showProgress.value;
    this.trainingDefinition.betaTestingGroup = this.betaTestingGroup.value;
  }

}
