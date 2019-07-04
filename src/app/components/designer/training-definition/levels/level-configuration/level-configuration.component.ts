import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractLevel} from "../../../../../model/level/abstract-level";
import {GameLevelConfigurationComponent} from "./game-level-configuration/game-level-configuration.component";
import {AssessmentLevelConfigurationComponent} from "./assessment-level-configuration/assessment-level-configuration.component";
import {InfoLevelConfigurationComponent} from "./info-level-configuration/info-level-configuration.component";
import {AbstractLevelTypeEnum} from "../../../../../model/enums/abstract-level-type.enum";

@Component({
  selector: 'level-configuration',
  templateUrl: './level-configuration.component.html',
  styleUrls: ['./level-configuration.component.css']
})
/**
 * Main component of level configuration. Serves as a wrapper and resolver of level type and displays specific component accordingly
 */
export class LevelConfigurationComponent implements OnInit {

  @ViewChild(GameLevelConfigurationComponent, { static: false }) gameLevelComponent;
  @ViewChild(AssessmentLevelConfigurationComponent, { static: false }) assessmentLevelComponent;
  @ViewChild(InfoLevelConfigurationComponent, { static: false }) infoLevelComponent;

  @Input('level') level: AbstractLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  levelTypes = AbstractLevelTypeEnum;

  ngOnInit() {
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
    switch (this.level.type) {
      case AbstractLevelTypeEnum.Game:
        return this.gameLevelComponent.canDeactivate();
      case AbstractLevelTypeEnum.Info:
        return this.infoLevelComponent.canDeactivate();
      case AbstractLevelTypeEnum.Assessment:
        return this.assessmentLevelComponent.canDeactivate();
    }
  }
}
