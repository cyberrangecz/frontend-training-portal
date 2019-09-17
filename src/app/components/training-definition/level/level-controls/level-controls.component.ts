import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';

@Component({
  selector: 'kypo2-level-controls',
  templateUrl: './level-controls.component.html',
  styleUrls: ['./level-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelControlsComponent implements OnInit {
  @Input() saveDisabled: boolean;
  @Output() addLevel: EventEmitter<AbstractLevelTypeEnum> = new EventEmitter();
  @Output() deleteLevel: EventEmitter<any> = new EventEmitter();
  @Output() saveLevel: EventEmitter<any> = new EventEmitter();

  levelTypes = AbstractLevelTypeEnum;
  constructor() { }

  ngOnInit() {
  }

  onAdd(type: AbstractLevelTypeEnum) {
    this.addLevel.emit(type);
  }

  onSave() {
    this.saveLevel.emit();
  }

  onDelete() {
    this.deleteLevel.emit();
  }
}
