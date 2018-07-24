import {Component, Input, OnInit} from '@angular/core';
import {LevelService} from "../../../../services/level.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {GameLevel} from "../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {InfoLevel} from "../../../../model/level/info-level";

@Component({
  selector: 'level-configuration',
  templateUrl: './level-configuration.component.html',
  styleUrls: ['./level-configuration.component.css']
})
export class LevelConfigurationComponent implements OnInit {

  @Input('level') level: AbstractLevel;

  isGameLevelActive: boolean;
  isInfoLevelActive: boolean;
  isAssessmentLevelActive: boolean;

  ngOnInit() {
    this.resolveLevelType();
  }

  private resolveLevelType() {
    this.isGameLevelActive = this.level instanceof GameLevel;
    this.isInfoLevelActive = this.level instanceof InfoLevel;
    this.isAssessmentLevelActive = this.level instanceof AssessmentLevel;
  }
}
