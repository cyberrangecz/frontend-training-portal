import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Controls for training definition edit page
 */
@Component({
  selector: 'kypo2-training-definition-edit-controls',
  templateUrl: './training-definition-edit-controls.component.html',
  styleUrls: ['./training-definition-edit-controls.component.scss']
})
export class TrainingDefinitionEditControlsComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() disabled: boolean;
  @Input() title: string;
  @Output() save: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emits event to save edited training definition and navigate to overview page
   */
  onSave() {
    this.save.emit(false);
  }

  /**
   * Emits event to save edited training definition and stay on the same page
   */
  onSaveAndStayOnPage() {
    this.save.emit(true);
  }
}
