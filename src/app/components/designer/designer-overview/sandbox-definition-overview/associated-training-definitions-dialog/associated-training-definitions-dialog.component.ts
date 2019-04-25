import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AssessmentLevelConfigurationComponent} from '../../../training-definition/levels/level-configuration/assessment-level-configuration/assessment-level-configuration.component';
import {DataSource} from '@angular/cdk/table';
import {TrainingDefinitionInfo} from '../../../../../model/training/training-definition-info';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-associated-training-definitions-dialog',
  templateUrl: './associated-training-definitions-dialog.component.html',
  styleUrls: ['./associated-training-definitions-dialog.component.css']
})
export class AssociatedTrainingDefinitionsDialogComponent implements OnInit {

  displayedColumns = ['title', 'actions'];
  dataSource: DataSource<TrainingDefinitionInfo>;

  constructor(public dialogRef: MatDialogRef<AssessmentLevelConfigurationComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private router: Router) {
  }

  ngOnInit() {
    this.dataSource = this.data.trainingDefinitions;
  }

  close() {
    this.dialogRef.close();
  }

  editTrainingDefinition(id: number) {
    this.dialogRef.close();
    this.router.navigate(['designer', 'training', id])
  }
}
