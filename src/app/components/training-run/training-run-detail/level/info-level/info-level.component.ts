import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InfoLevel} from '../../../../../model/level/info-level';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent extends BaseComponent implements OnInit {

  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onNext() {
    this.next.emit();
  }
}
