import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlButton} from '../../../../model/controls/control-button';
import {ExpandableControlButton} from '../../../../model/controls/expandable-control-button';
import {ExpandedMenuControlButton} from '../../../../model/controls/expanded-menu-control-button';

@Component({
  selector: 'kypo2-expandable-control-button',
  templateUrl: './expandable-control-button.component.html',
  styleUrls: ['./expandable-control-button.component.css']
})
export class ExpandableControlButtonComponent implements OnInit {

  @Input() expandableControl: ExpandableControlButton;
  @Output() action: EventEmitter<ControlButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAction(control: ExpandedMenuControlButton) {
    this.action.emit(control);
  }

}
