import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  onAdd() {
    this.add.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
