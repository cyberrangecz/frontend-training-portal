import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {MatDialogRef, MatListOption, MatSelectionList} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {SandboxDefinitionPickerComponent} from "../../../../designer/training-definition/training-configuration/sandbox-definition-picker/sandbox-definition-picker.component";
import {TrainingDefinition} from "../../../../../model/training/training-definition";
import {TrainingDefinitionGetterService} from "../../../../../services/data-getters/training-definition-getter.service";

@Component({
  selector: 'training-definition-picker',
  templateUrl: './training-definition-picker.component.html',
  styleUrls: ['./training-definition-picker.component.css']
})
/**
 * Popup dialog to choose from training definition which will be associated with the training instance
 */
export class TrainingDefinitionPickerComponent implements OnInit {

  trainingDefs$: Observable<TrainingDefinition[]>;
  selectedTrainingDefs: TrainingDefinition[];

  @ViewChild(MatSelectionList) trainingDefsList: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {

  }

  ngOnInit() {
    this.trainingDefsList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.trainingDefs$ = this.trainingDefinitionGetter.getTrainingDefs();
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      trainingDef: this.selectedTrainingDefs[0]
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

}
