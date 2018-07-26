import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {User} from "../../../../model/user/user";
import {AlertService} from "../../../../services/event-services/alert.service";
import {MatDialog} from "@angular/material";
import {AuthorsPickerComponent} from "../../../designer/training-definition/training-configuration/authors-picker/authors-picker.component";
import {OrganizersPickerComponent} from "./organizers-picker/organizers-picker.component";
import {TrainingDefinitionPickerComponent} from "./training-definition-picker/training-definition-picker.component";

@Component({
  selector: 'training-instance-definition',
  templateUrl: './training-instance-definition.component.html',
  styleUrls: ['./training-instance-definition.component.css']
})
export class TrainingInstanceDefinitionComponent implements OnInit {

  @Output('trainingChange') trainingChange = new EventEmitter();

  title: string;
  startTime: Date;
  endTime: Date;
  poolSize: number;
  organizers: User[];
  trainingDefinition: TrainingDefinition;


  constructor(
    private alertService: AlertService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  chooseOrganizers() {
    const dialogRef = this.dialog.open(OrganizersPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.organizers = result.organizers;
      }
    });
  }

  chooseTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingDefinition = result.trainingDef;
      }
    });
  }

  saveChanges() {
    this.trainingChanged();
  }

  trainingChanged() {
    this.trainingChange.emit();
  }

}
