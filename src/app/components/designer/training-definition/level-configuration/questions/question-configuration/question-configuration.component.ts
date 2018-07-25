import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'question-configuration',
  templateUrl: './question-configuration.component.html',
  styleUrls: ['./question-configuration.component.css']
})
export class QuestionConfigurationComponent implements OnInit {

  @Input('question') question: string;
  @Output('question') questionChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  saveChanges() {

  }

}
