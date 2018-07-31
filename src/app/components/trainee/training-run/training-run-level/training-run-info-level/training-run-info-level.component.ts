import {Component, Input, OnInit} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";

@Component({
  selector: 'training-run-info-level',
  templateUrl: './training-run-info-level.component.html',
  styleUrls: ['./training-run-info-level.component.css']
})
export class TrainingRunInfoLevelComponent implements OnInit {

  @Input('level') level: InfoLevel;

  constructor() { }

  ngOnInit() {
  }

}
