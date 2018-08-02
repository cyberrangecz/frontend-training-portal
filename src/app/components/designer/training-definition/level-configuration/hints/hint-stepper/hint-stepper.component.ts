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
/**
 * Hint stepper component, to navigate through existing hints and creating new hints
 */
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

  /**
   * Creates new hint with default values
   */
  addHint() {
    this.hints.push(new Hint(
      'New hint',
      '',
      0));
    this.hintsChanged();
  }

  /**
   * Saves all created hints
   */
  saveChanges() {
    this.hintConfigurationChildren.forEach(child => child.saveChanges());
  }

  /**
   * Initializes hints if no hints are passed from parents component
   */
  private resolveInitialHints() {
    if (!this.hints) {
      this.hints = [];
    }
  }

  /**
   * Emits event if new hint is added or saved
   */
  private hintsChanged() {
    this.hintsChange.emit(this.hints);
  }

}
