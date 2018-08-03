import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'question-configuration',
  templateUrl: './question-configuration.component.html',
  styleUrls: ['./question-configuration.component.css']
})
export class QuestionConfigurationComponent implements OnInit {

  @Input('question') question: string;
  @Output('question') questionChange = new EventEmitter();

  dirty = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty
  }

  saveChanges() {
    this.dirty = false;
  }

}
