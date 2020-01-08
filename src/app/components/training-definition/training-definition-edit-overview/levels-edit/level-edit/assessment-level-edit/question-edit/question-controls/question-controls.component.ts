import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * Question controls for questions edit overview
 */
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

  /**
   * Emits event to add question of type MCQ
   */
  onAddMCQ() {
    this.addMCQ.emit();
  }
  /**
   * Emits event to add question of type FFQ
   */
  onAddFFQ() {
    this.addFFQ.emit();
  }
  /**
   * Emits event to add question of type EMI
   */
  onAddEMI() {
    this.addEMI.emit();
  }

}
