import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {TrainingDefinitionSetterService} from "../../../../services/data-setters/training-definition-setter.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {DesignerAlertMessageEnum} from "../../../../enums/designer-alert-message.enum";
import {SandboxDefinitionPickerComponent} from "./sandbox-definition-picker/sandbox-definition-picker.component";
import {MatDialog} from "@angular/material";
import {AuthorsPickerComponent} from "./authors-picker/authors-picker.component";
import {User} from "../../../../model/user/user";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {UserGetterService} from "../../../../services/data-getters/user-getter.service";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";

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
    private dialog: MatDialog,
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
      this.resolveInputTraining();
    }
  }

  /**
   * Displays Material modal with list of authors and assigns selected authors to the training definition
   */
  chooseAuthors() {
    const dialogRef = this.dialog.open(AuthorsPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.authors = result.authors;
      }
    });
  }

  chooseSandboxDefs() {
    const dialogRef = this.dialog.open(SandboxDefinitionPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sandboxDef = result.sandboxDef;
      }
    });
  }

  saveTrainingDef() {
    this.setInputValuesToTrainingDef();
    if (this.validateTrainingDef()) {
      this.trainingDefinitionSetter.addTrainingDefinition(this.trainingDefinition);
      this.alertService.emitAlertMessage(DesignerAlertMessageEnum.Success, 'Training definition was successfully saved');
    } else {
      // error message
    }
  }

  private resolveInputTraining() {
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

  private initValuesForNewTraining() {
    this.title = '';
    this.description = '';
    this.prerequisites = '';
    this.outcomes = '';
    this.selectedState = 'unreleased';
  }

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

  private setInputValuesToTrainingDef() {
    this.trainingDefinition.title = this.title;
    this.trainingDefinition.authorIds = this.authors.map(author => author.id);
    this.trainingDefinition.description = this.description;
    this.trainingDefinition.prerequisites = this.prerequisites;
    this.trainingDefinition.outcomes = this.outcomes;
    this.trainingDefinition.state = TrainingDefinitionStateEnum[this.selectedState.charAt(0).toUpperCase() + this.selectedState.slice(1)];
    this.trainingDefinition.sandboxDefinitionId = this.sandboxDef.id;
  }

  private validateTrainingDef(): boolean {
    // TODO: Validate
    return true;
  }
}
