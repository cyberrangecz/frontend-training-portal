import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  onSave() {
    this.save.emit(false);
  }

  onSaveAndStayOnPage() {
    this.save.emit(true);
  }
}
