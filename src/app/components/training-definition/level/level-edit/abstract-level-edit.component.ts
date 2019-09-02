import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import {GameLevelEditComponent} from './game-level-edit/game-level-edit.component';
import {AssessmentLevelEditComponent} from './assessment-level-edit/assessment-level-edit.component';
import {InfoLevelEditComponent} from './info-level-edit/info-level-edit.component';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-level-configuration',
  templateUrl: './abstract-level-edit.component.html',
  styleUrls: ['./abstract-level-edit.component.css']
})
/**
 * Main component of level configuration. Serves as a wrapper and resolver of level type and displays specific component accordingly
 */
export class AbstractLevelEditComponent extends BaseComponent implements OnInit {

  @ViewChild(GameLevelEditComponent, { static: false }) gameLevelComponent;
  @ViewChild(AssessmentLevelEditComponent, { static: false }) assessmentLevelComponent;
  @ViewChild(InfoLevelEditComponent, { static: false }) infoLevelComponent;

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
