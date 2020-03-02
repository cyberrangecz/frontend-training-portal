import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlButton} from '../../../../model/controls/control-button';

@Component({
  selector: 'kypo2-basic-control-button',
  templateUrl: './basic-control-button.component.html',
  styleUrls: ['./basic-control-button.component.css']
})
export class BasicControlButtonComponent implements OnInit {

  @Input() control: ControlButton;
  @Output() action: EventEmitter<ControlButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAction(control: ControlButton) {
    this.action.emit(control);
  }
}
