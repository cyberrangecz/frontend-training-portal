import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Hint} from "../../../../../../model/level/hint";

@Component({
  selector: 'hint-stepper',
  templateUrl: './hint-stepper.component.html',
  styleUrls: ['./hint-stepper.component.css']
})
export class HintStepperComponent implements OnInit, OnChanges {

  @Input('hints') hints: Hint[];
  @Output('hints') hintsChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('hints' in changes) {
      this.resolveInitialHints();
    }
  }

  addHint() {
    this.hints.push(new Hint(
      'New hint',
      '',
      0));
    this.hintsChanged();
  }

  private resolveInitialHints() {
    if (!this.hints) {
      this.hints = [];
    }
  }

  private hintsChanged() {
    this.hintsChange.emit(this.hints);
  }

}
