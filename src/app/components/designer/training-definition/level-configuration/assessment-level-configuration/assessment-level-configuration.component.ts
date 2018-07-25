import {Component, Input, OnInit} from '@angular/core';
import {AssessmentLevel} from "../../../../../model/level/assessment-level";

@Component({
  selector: 'assessment-level-configuration',
  templateUrl: './assessment-level-configuration.component.html',
  styleUrls: ['./assessment-level-configuration.component.css']
})
export class AssessmentLevelConfigurationComponent implements OnInit {

  @Input('level') level: AssessmentLevel;

  constructor() { }

  ngOnInit() {
  }

}
