import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Component of control bar for training instance edit overview
 */
@Component({
  selector: 'kypo2-training-instance-edit-controls',
  templateUrl: './training-instance-edit-controls.component.html',
  styleUrls: ['./training-instance-edit-controls.component.scss']
})
export class TrainingInstanceEditControlsComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() disabled: boolean;
  @Input() title: string;
  @Output() save: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emits event to save the edited training instance
   */
  onSave() {
    this.save.emit(false);
  }

  /**
   * Emits event to save the edited training instance and stay on the same page
   */
  onSaveAndStayOnPage() {
    this.save.emit(true);
  }
}
