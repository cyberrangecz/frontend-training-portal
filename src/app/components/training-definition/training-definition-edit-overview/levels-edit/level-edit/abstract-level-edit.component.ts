import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractLevelTypeEnum} from 'kypo-training-model';
import {Level} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';

/**
 * Main component of level edit. Resolves which component should be display based on level type
 */
@Component({
  selector: 'kypo2-level-edit',
  templateUrl: './abstract-level-edit.component.html',
  styleUrls: ['./abstract-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbstractLevelEditComponent extends KypoBaseComponent implements OnInit {

  @Input() level: Level;
  @Output() levelChange: EventEmitter<Level> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  ngOnInit() {
  }

  /**
   * Passes emitted event to the parent component
   * @param level changed level
   */
  onLevelChange(level: Level) {
    this.levelChange.emit(level);
  }
}
