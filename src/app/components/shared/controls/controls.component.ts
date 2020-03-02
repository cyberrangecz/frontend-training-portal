import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlButton} from '../../../model/controls/control-button';
import {ExpandableControlButton} from '../../../model/controls/expandable-control-button';

@Component({
  selector: 'kypo2-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnInit {

  @Input() controls: ControlButton[];
  @Output() action: EventEmitter<ControlButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAction(control: ControlButton) {
    this.action.emit(control);
  }

  isExpandable(control: ControlButton): boolean {
    return control instanceof ExpandableControlButton;
  }
}
