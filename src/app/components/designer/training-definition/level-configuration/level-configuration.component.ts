import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {GameLevel} from "../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {InfoLevel} from "../../../../model/level/info-level";

@Component({
  selector: 'level-configuration',
  templateUrl: './level-configuration.component.html',
  styleUrls: ['./level-configuration.component.css']
})
/**
 * Main component of level configuration. Serves as a wrapper and resolver of level type and displays specific component accordingly
 */
export class LevelConfigurationComponent implements OnInit, OnChanges {

  @Input('level') level: AbstractLevel;

  isGameLevelActive: boolean;
  isInfoLevelActive: boolean;
  isAssessmentLevelActive: boolean;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.resolveLevelType();
    }
  }

  /**
   * Resolves type of level
   */
  private resolveLevelType() {
    this.isGameLevelActive = this.level instanceof GameLevel;
    this.isInfoLevelActive = this.level instanceof InfoLevel;
    this.isAssessmentLevelActive = this.level instanceof AssessmentLevel;
  }
}
