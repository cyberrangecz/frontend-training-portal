import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractLevel} from "../../../../../model/level/abstract-level";
import {GameLevel} from "../../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {InfoLevel} from "../../../../../model/level/info-level";
import {GameLevelConfigurationComponent} from "./game-level-configuration/game-level-configuration.component";
import {AssessmentLevelConfigurationComponent} from "./assessment-level-configuration/assessment-level-configuration.component";
import {InfoLevelConfigurationComponent} from "./info-level-configuration/info-level-configuration.component";

@Component({
  selector: 'level-configuration',
  templateUrl: './level-configuration.component.html',
  styleUrls: ['./level-configuration.component.css']
})
/**
 * Main component of level configuration. Serves as a wrapper and resolver of level type and displays specific component accordingly
 */
export class LevelConfigurationComponent implements OnInit, OnChanges {

  @ViewChild(GameLevelConfigurationComponent) gameLevelComponent;
  @ViewChild(AssessmentLevelConfigurationComponent) assessmentLevelComponent;
  @ViewChild(InfoLevelConfigurationComponent) infoLevelComponent;


  @Input('level') level: AbstractLevel;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

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
   * Emits event saying that level with given index should be deleted
   * @param {number} index index of a level which should be deleted
   */
  onDeleteLevel(index: number) {
    this.deleteLevel.emit(index);
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    if (this.isGameLevelActive) {
      return this.gameLevelComponent.canDeactivate();
    } else if (this.isAssessmentLevelActive) {
      return this.assessmentLevelComponent.canDeactivate()
    } else {
      return this.infoLevelComponent.canDeactivate();
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
