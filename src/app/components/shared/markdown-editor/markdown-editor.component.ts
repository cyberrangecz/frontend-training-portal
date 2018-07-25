import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'shared-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})
export class MarkdownEditorComponent implements OnInit {

  @Input('content') content: string;
  @Output() contentChange = new EventEmitter();
  editContent = true;

  constructor() { }

  ngOnInit() {
  }

  contentChanged() {
    this.contentChange.emit(this.content);
  }

}
