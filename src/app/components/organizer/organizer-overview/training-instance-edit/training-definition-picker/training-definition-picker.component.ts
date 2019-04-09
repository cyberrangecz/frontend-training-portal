import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SandboxDefinitionPickerComponent} from "../../../../designer/training-definition/training-configuration/sandbox-definition-picker/sandbox-definition-picker.component";
import {TrainingDefinition} from "../../../../../model/training/training-definition";
import {TrainingDefinitionFacade} from "../../../../../services/facades/training-definition-facade.service";

@Component({
  selector: 'training-definition-picker',
  templateUrl: './training-definition-picker.component.html',
  styleUrls: ['./training-definition-picker.component.css']
})
/**
 * Popup dialog to choose from training definition which will be associated with the training instance
 */
export class TrainingDefinitionPickerComponent implements OnInit {

  trainingDefs: TrainingDefinition[];
  selectedTrainingDef: TrainingDefinition;
  isLoading = true;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
    public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
    private trainingDefinitionFacade: TrainingDefinitionFacade) {

  }

  ngOnInit() {
    this.loadTrainingDefinitions();
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      trainingDef: this.selectedTrainingDef
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      sandboxDef: null
    };
    this.dialogRef.close(result);
  }

  private loadTrainingDefinitions() {
    this.trainingDefinitionFacade.getTrainingDefinitions()
      .subscribe(trainings => {
        if (this.hasPreselection()) {
          this.preselectTrainingDef(trainings);
        }
        this.trainingDefs = trainings;
        this.isLoading = false;
      });
  }

  private hasPreselection(): boolean {
    return this.data !== null && this.data !== undefined;
  }

  private preselectTrainingDef(trainings: TrainingDefinition[]) {
    const preselected = trainings.find(training => training.id == this.data.id);
    if (preselected) {
      this.selectedTrainingDef = preselected;
    }
  }
}
