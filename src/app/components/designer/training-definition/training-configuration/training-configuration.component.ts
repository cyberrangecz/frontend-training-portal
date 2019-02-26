import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {TrainingDefinitionStateEnum} from '../../../../enums/training-definition-state.enum';
import {AlertService} from '../../../../services/event-services/alert.service';
import {AlertTypeEnum} from '../../../../enums/alert-type.enum';
import {SandboxDefinitionPickerComponent} from './sandbox-definition-picker/sandbox-definition-picker.component';
import {MatDialog} from '@angular/material';
import {AuthorsPickerComponent} from './authors-picker/authors-picker.component';
import {SandboxDefinition} from '../../../../model/sandbox/sandbox-definition';
import {UserFacade} from '../../../../services/facades/user-facade.service';
import {SandboxDefinitionFacade} from '../../../../services/facades/sandbox-definition-facade.service';
import {Router} from '@angular/router';
import {ActiveUserService} from '../../../../services/active-user.service';
import {ComponentErrorHandlerService} from '../../../../services/component-error-handler.service';
import {map} from 'rxjs/operators';
import {StateChangeDialogComponent} from '../state-change-dialog/state-change-dialog.component';
import {Observable, of} from 'rxjs';
import {TrainingDefinitionFacade} from "../../../../services/facades/training-definition-facade.service";
import {ViewGroup} from "../../../../model/user/view-group";
import {EditViewGroupComponent} from "./edit-view-group/edit-view-group.component";
import {User} from '../../../../model/user/user';

/**
 * Component for creating new or editing already existing training definition
 */
@Component({
  selector: 'training-configuration',
  templateUrl: './training-configuration.component.html',
  styleUrls: ['./training-configuration.component.css']
})
export class TrainingConfigurationComponent implements OnInit, OnChanges {

  @Input('trainingDefinition') trainingDefinition: TrainingDefinition;
  @Output('isTrainingSaved') savedTrainingChange = new EventEmitter<boolean>();
  @Output('trainingDefId') idChange = new EventEmitter<number>();

  editMode: boolean;

  title: string;
  description: string;
  prerequisites: string[];
  outcomes: string[];
  authors: User[];
  sandboxDef$: Observable<SandboxDefinition>;
  selectedSandboxDefId: number;
  selectedState: string;
  showProgress: boolean;
  viewGroup: ViewGroup;

  dirty = false;
  states: string[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ComponentErrorHandlerService,
    private alertService: AlertService,
    private userFacade: UserFacade,
    private activeUserService: ActiveUserService,
    private sandboxDefinitionFacade: SandboxDefinitionFacade,
    private trainingDefinitionFacade: TrainingDefinitionFacade) {

  }

  ngOnInit() {
    this.states = Object.values(TrainingDefinitionStateEnum);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
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
    const dialogRef = this.dialog.open(AuthorsPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.authors = result.authors;
        this.dirty = true;
      }
    });
  }

  editViewGroup() {
    const dialogRef = this.dialog.open(EditViewGroupComponent, {
      data: this.viewGroup
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.viewGroup = result.viewGroup;
        this.dirty = true;
      }
    })
  }

  /**
   * Displays dialog window with list of sandbox definitions and assigns selected sandbox definition to the training definition
   */
  chooseSandboxDefs() {
    const dialogRef = this.dialog.open(SandboxDefinitionPickerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        console.log(result);
        this.sandboxDef$ = of(result.sandboxDef);
        this.selectedSandboxDefId = result.sandboxDef.id;
        this.dirty = true;
      }
    });
  }

  /**
   * Saves created or edited training definition, validates the input and send request to save the training definition in database
   */
  saveTrainingDef() {
    if (this.validateInput()) {
      this.checkStateChange().subscribe(confirmed => {
        if (confirmed) {
          this.setInputValuesToTrainingDef();
          this.sendRequestToSaveChanges();
        }
      })
    }
  }

  contentChanged() {
    this.dirty = true;
  }

  private performActionsAfterSuccessfulSave(id: number) {
    this.trainingDefinition.id = id;
    this.idChange.emit(id);
    this.savedTrainingChange.emit(true);
    this.dirty = false;
    this.redirectIfStateNotUnreleased();
    this.resolveModeAfterSuccessfulSave();
  }

  private resolveModeAfterSuccessfulSave() {
    if (!this.editMode && this.trainingDefinition.state == TrainingDefinitionStateEnum.Unreleased) {
      this.router.navigate(['designer/training/' + this.trainingDefinition.id]);
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
      this.createTrainingDefinition()
    }
  }

  private redirectIfStateNotUnreleased() {
    if (this.trainingDefinition.state !== TrainingDefinitionStateEnum.Unreleased) {
      this.router.navigate(['/designer']);
    }
  }

  private checkStateChange(): Observable<boolean> {
    if (!this.editMode || this.selectedState === TrainingDefinitionStateEnum.Unreleased ) {
      return of(true);
    } else {
      return this.displayUserDialogToConfirmStateChange()
    }
  }

  private displayUserDialogToConfirmStateChange(): Observable<boolean> {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {data: this.selectedState});
    return dialogRef.afterClosed()
      .pipe(map(result => result && result.type === 'confirm'));
  }

  private updateTrainingDefinition() {
    this.trainingDefinitionFacade.updateTrainingDefinition(this.trainingDefinition)
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.');
          this.performActionsAfterSuccessfulSave(response);
        },
        err => this.errorHandler.displayHttpError(err, 'Editing training definition')
      );
  }

  private createTrainingDefinition() {
    this.trainingDefinitionFacade.createTrainingDefinition(this.trainingDefinition)
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully saved.');
          this.performActionsAfterSuccessfulSave(response);
        },
        err => this.errorHandler.displayHttpError(err, 'Creating new training definition')
      )
  }

  /**
   * Resolves whether the training definition passed from parent component is null (create new) or not (edit existing)
   */
  private resolveInitialTraining() {
    if (!this.trainingDefinition) {
      this.editMode = false;
      this.initValuesForNewTraining();
      this.trainingDefinition = new TrainingDefinition();
      this.showProgress = true;
    } else {
      this.editMode = true;
      this.initValuesForEdit();
    }
  }

  /**
   * Sets initial values of input elements if new training definition is created
   */
  private initValuesForNewTraining() {
    this.title = '';
    this.description = '';
    this.prerequisites = [''];
    this.outcomes = [''];
    this.selectedState = 'unreleased';
    this.viewGroup = null;
    this.authors = [this.activeUserService.getActiveUser()];
  }

  /**
   * Sets initial values of input elements if existing training definition is edited
   */
  private initValuesForEdit() {
    this.title = this.trainingDefinition.title;
    this.description = this.trainingDefinition.description;
    this.prerequisites = this.trainingDefinition.prerequisites;
    this.outcomes = this.trainingDefinition.outcomes;
    this.selectedState = this.trainingDefinition.state;
    this.showProgress = this.trainingDefinition.showStepperBar;
    this.viewGroup = this.trainingDefinition.viewGroup;
    if (!this.prerequisites) this.prerequisites = [''];
    if (!this.outcomes) this.outcomes = [''];
    this.authors = this.trainingDefinition.authors;
    this.loadSandboxDefinition();
  }

  private loadSandboxDefinition() {
    this.sandboxDef$ = this.sandboxDefinitionFacade.getSandboxDefById(this.trainingDefinition.sandboxDefinitionId)
      .pipe(map(result => {
        this.selectedSandboxDefId = result.id;
        return result;
      }));
  }

  /**
   * Sets validated values from user input to the training definition object
   */
  private setInputValuesToTrainingDef() {
    this.trainingDefinition.sandboxDefinitionId = this.selectedSandboxDefId;
    this.trainingDefinition.title = this.title;
    this.trainingDefinition.authors = this.authors;
    this.trainingDefinition.description = this.description;
    this.trainingDefinition.prerequisites = this.prerequisites;
    this.trainingDefinition.outcomes = this.outcomes;
    this.trainingDefinition.state = TrainingDefinitionStateEnum[this.selectedState.charAt(0).toUpperCase() + this.selectedState.slice(1)];
    this.trainingDefinition.showStepperBar = this.showProgress;
    this.trainingDefinition.viewGroup = this.viewGroup;
  }

  /**
   * Validates user input for the training definition
   * @returns {boolean} return true if input passes the validation, false otherwise
   */
  private validateInput(): boolean {
    let errorMessage: string = '';
    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.authors || this.authors.length === 0) {
      errorMessage += 'Authors cannot be empty\n';
    }

    if (!this.viewGroup
      || !this.viewGroup.organizers
      || this.viewGroup.organizers.length === 0) {
      errorMessage += 'View group cannot be empty\n';
    }
    if (this.selectedSandboxDefId === null || this.selectedSandboxDefId === undefined) {
      errorMessage += 'Sandbox definition cannot be empty\n';
    }
    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }
}
