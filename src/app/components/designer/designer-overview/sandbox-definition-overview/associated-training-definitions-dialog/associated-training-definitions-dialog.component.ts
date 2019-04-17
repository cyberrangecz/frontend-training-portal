import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AssessmentLevelConfigurationComponent} from '../../../training-definition/levels/level-configuration/assessment-level-configuration/assessment-level-configuration.component';
import {DataSource} from '@angular/cdk/table';
import {TrainingDefinition} from '../../../../../model/training/training-definition';

@Component({
  selector: 'app-associated-training-definitions-dialog',
  templateUrl: './associated-training-definitions-dialog.component.html',
  styleUrls: ['./associated-training-definitions-dialog.component.css']
})
export class AssociatedTrainingDefinitionsDialogComponent implements OnInit {

  displayedColumns = ['title'];
  dataSource: DataSource<TrainingDefinition>;

  constructor(public dialogRef: MatDialogRef<AssessmentLevelConfigurationComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.dataSource = this.data.trainingDefinitions;
  }

  close() {
    this.dialogRef.close();
  }
}
