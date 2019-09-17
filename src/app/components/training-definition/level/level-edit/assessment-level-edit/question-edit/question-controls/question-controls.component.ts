import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kypo2-question-controls',
  templateUrl: './question-controls.component.html',
  styleUrls: ['./question-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionControlsComponent implements OnInit {
  @Output() addMCQ: EventEmitter<any> = new EventEmitter<any>();
  @Output() addFFQ: EventEmitter<any> = new EventEmitter<any>();
  @Output() addEMI: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onAddMCQ() {
    this.addMCQ.emit();
  }

  onAddFFQ() {
    this.addFFQ.emit();
  }

  onAddEMI() {
    this.addEMI.emit();
  }

}
