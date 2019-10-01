import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  onSave() {
    this.save.emit(false);
  }

  onSaveAndStayOnPage() {
    this.save.emit(true);
  }
}
