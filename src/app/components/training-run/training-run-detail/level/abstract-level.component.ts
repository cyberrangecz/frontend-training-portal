import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';
import {Level} from '../../../../model/level/level';
import {BaseComponent} from '../../../base.component';

/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
@Component({
  selector: 'kypo2-abstract-level',
  templateUrl: './abstract-level.component.html',
  styleUrls: ['./abstract-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbstractLevelComponent extends BaseComponent implements OnInit {

  @Input() level: Level;
  @Input() isLast: boolean;
  @Input() sandboxId: number;

  @Output() next: EventEmitter<void> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onNext() {
    this.next.emit();
  }
}
