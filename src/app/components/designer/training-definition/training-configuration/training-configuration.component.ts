import {Component, Input, OnInit} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";

@Component({
  selector: 'training-configuration',
  templateUrl: './training-configuration.component.html',
  styleUrls: ['./training-configuration.component.css']
})
export class TrainingConfigurationComponent implements OnInit {

  @Input('trainingDef') trainingDef: TrainingDefinition;

  constructor() { }

  ngOnInit() {
  }

}
