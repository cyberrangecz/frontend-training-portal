import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SandboxDefinitionPickerComponent} from '../../../../training-definition/training-definition-edit-container/training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {TrainingDefinitionFacade} from '../../../../../services/facades/training-definition-facade.service';
import {TrainingDefinitionInfo} from '../../../../../model/training/training-definition-info';
import {TrainingDefinitionStateEnum} from '../../../../../model/enums/training-definition-state.enum';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-training-definition-picker',
  templateUrl: './training-definition-picker.component.html',
  styleUrls: ['./training-definition-picker.component.css']
})
/**
 * Popup dialog to choose from training definition which will be associated with the training instance
 */
export class TrainingDefinitionPickerComponent extends BaseComponent implements OnInit {

  releasedTrainingDefs: TrainingDefinitionInfo[] = [];
  unreleasedTrainingDefs: TrainingDefinitionInfo[] = [];
  selectedTrainingDef: TrainingDefinitionInfo;
  isLoading = true;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
              public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
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
    this.trainingDefinitionFacade.getAllForOrganizer()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(trainings => {
        if (this.hasPreselection()) {
          this.preselectTrainingDef(trainings);
        }
        this.releasedTrainingDefs = trainings.filter(training => training.state === TrainingDefinitionStateEnum.Released);
        this.unreleasedTrainingDefs = trainings.filter(training => training.state === TrainingDefinitionStateEnum.Unreleased);
        this.isLoading = false;
      });
  }

  private hasPreselection(): boolean {
    return this.data !== null && this.data !== undefined;
  }

  private preselectTrainingDef(trainings: TrainingDefinitionInfo[]) {
    const preselected = trainings.find(training => training.id == this.data.id);
    if (preselected) {
      this.selectedTrainingDef = preselected;
    }
  }
}
