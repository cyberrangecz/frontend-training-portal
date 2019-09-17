import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-level-edit',
  templateUrl: './abstract-level-edit.component.html',
  styleUrls: ['./abstract-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of level configuration. Serves as a wrapper and resolver of level type and displays specific component accordingly
 */
export class AbstractLevelEditComponent extends BaseComponent implements OnInit {

  @Input() level: AbstractLevel;
  @Output() levelChange: EventEmitter<AbstractLevel> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  ngOnInit() {
  }

  onLevelChange(level: AbstractLevel) {
    this.levelChange.emit(level);
  }
}
