import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {Hint} from "../../../../../../model/level/hint";
import {HintConfigurationComponent} from "../hint-configuration/hint-configuration.component";

@Component({
  selector: 'hint-stepper',
  templateUrl: './hint-stepper.component.html',
  styleUrls: ['./hint-stepper.component.css']
})
export class HintStepperComponent implements OnInit, OnChanges {

  @Input('hints') hints: Hint[];
  @Output('hints') hintsChange = new EventEmitter();

  @ViewChildren(HintConfigurationComponent) hintConfigurationChildren: QueryList<HintConfigurationComponent>;


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

  saveChanges() {
    this.hintConfigurationChildren.forEach(child => child.saveChanges());
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
