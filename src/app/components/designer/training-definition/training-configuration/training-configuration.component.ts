import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {TrainingDefinitionSetterService} from "../../../../services/data-setters/training-definition-setter.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {SandboxDefinitionPickerComponent} from "./sandbox-definition-picker/sandbox-definition-picker.component";
import {MatDialog} from "@angular/material";
import {AuthorsPickerComponent} from "./authors-picker/authors-picker.component";
import {User} from "../../../../model/user/user";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {UserGetterService} from "../../../../services/data-getters/user-getter.service";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";
import {Router} from "@angular/router";
import {ActiveUserService} from "../../../../services/active-user.service";

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

  title: string;
  description: string;
  prerequisites: string;
  outcomes: string;
  authors: User[];
  sandboxDef: SandboxDefinition;
  selectedState: string;

  states: string[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activeUserService: ActiveUserService,
    private alertService: AlertService,
    private userGetter: UserGetterService,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService,
    private trainingDefinitionSetter: TrainingDefinitionSetterService) {

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
   * Displays dialog window with list of authors and assigns selected authors to the training definition
   */
  chooseAuthors() {
    const dialogRef = this.dialog.open(AuthorsPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.authors = result.authors;
      }
    });
  }
  /**
   * Displays dialog window with list of sandbox definitions and assigns selected sandbox definition to the training definition
   */
  chooseSandboxDefs() {
    const dialogRef = this.dialog.open(SandboxDefinitionPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sandboxDef = result.sandboxDef;
      }
    });
  }

  /**
   * Saves created or edited training definition, validates the input and send request to save the training definition in database
   */
  saveTrainingDef() {
    if (this.validateInput()) {
      this.setInputValuesToTrainingDef();
      this.trainingDefinitionSetter.addTrainingDefinition(this.trainingDefinition);
      this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully saved');
    } else {
      // error message
    }
  }

  /**
   * Resolves whether the training definition passed from parent component is null (create new) or not (edit existing)
   */
  private resolveInitialTraining() {
    if (!this.trainingDefinition) {
      this.initValuesForNewTraining();
      this.trainingDefinition = new TrainingDefinition(
        null,
        [],
        TrainingDefinitionStateEnum.Unreleased,
        []
      );
      this.trainingDefinition.title = 'New Training Definition'
    } else {
      this.initValuesForEdit();
    }
  }

  /**
   * Sets initial values of input elements if new training definition is created
   */
  private initValuesForNewTraining() {
    this.title = '';
    this.description = '';
    this.prerequisites = '';
    this.outcomes = '';
    this.selectedState = 'unreleased';
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

    this.userGetter.loadUsersByIds(this.trainingDefinition.authorIds)
      .subscribe(authors => this.authors = authors);
    this.sandboxDefinitionGetter.getSandboxDefById(this.trainingDefinition.sandboxDefinitionId)
      .subscribe(sandbox => this.sandboxDef = sandbox)
  }

  /**
   * Sets validated values from user input to the training definition object
   */
  private setInputValuesToTrainingDef() {
    this.trainingDefinition.title = this.title;
    this.trainingDefinition.authorIds = this.authors.map(author => author.id);
    this.trainingDefinition.description = this.description;
    this.trainingDefinition.prerequisites = this.prerequisites;
    this.trainingDefinition.outcomes = this.outcomes;
    this.trainingDefinition.state = TrainingDefinitionStateEnum[this.selectedState.charAt(0).toUpperCase() + this.selectedState.slice(1)];
    this.trainingDefinition.sandboxDefinitionId = this.sandboxDef.id;
  }

  /**
   * Validates user input for the training definition
   * @returns {boolean} return true if input passes the validation, false otherwise
   */
  private validateInput(): boolean {
    // TODO: Validate input
    let errorMessage: string = '';
    if (!this.authors || this.authors.length === 0) {
      errorMessage += 'Authors cannot be empty\n';
    }
    if (!this.sandboxDef) {
      errorMessage += 'Sandbox definition cannot be empty\n';
    }
    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }
}
