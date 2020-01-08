import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * Component containing controls for training instance overview page
 */
@Component({
  selector: 'kypo2-training-instance-controls',
  templateUrl: './training-instance-controls.component.html',
  styleUrls: ['./training-instance-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceControlsComponent implements OnInit {

  @Output() create: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emits event to create new training instance
   */
  onCreate() {
    this.create.emit();
  }
}
