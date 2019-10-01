import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kypo2-training-instance-controls',
  templateUrl: './training-instance-controls.component.html',
  styleUrls: ['./training-instance-controls.component.scss']
})
export class TrainingInstanceControlsComponent implements OnInit {

  @Output() create: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCreate() {
    this.create.emit();
  }
}
