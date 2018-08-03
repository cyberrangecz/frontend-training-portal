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

  dirty = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('hints' in changes) {
      this.resolveInitialHints();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty && this.hintConfigurationChildren.toArray().every(child => child.canDeactivate());
  }

  /**
   * Creates new hint with default values
   */
  addHint() {
    this.hints.push(new Hint(
      'New hint',
      '',
      0));
    this.dirty = true;
    this.hintsChanged();
  }

  /**
   * Saves all created hints
   */
  saveChanges() {
    this.hintConfigurationChildren.forEach(child => child.saveChanges());
    this.dirty = false;
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
