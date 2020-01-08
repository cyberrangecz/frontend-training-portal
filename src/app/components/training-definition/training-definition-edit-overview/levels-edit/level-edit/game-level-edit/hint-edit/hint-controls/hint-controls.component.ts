import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Hint controls for hint overview component
 */
@Component({
  selector: 'kypo2-hint-controls',
  templateUrl: './hint-controls.component.html',
  styleUrls: ['./hint-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintControlsComponent implements OnInit {

  @Input() deleteDisabled: boolean;
  @Input() addDisabled: boolean;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emits event to add new hint
   */
  onAdd() {
    this.add.emit();
  }

  /**
   * Emits event to delete active hint
   */
  onDelete() {
    this.delete.emit();
  }

}
