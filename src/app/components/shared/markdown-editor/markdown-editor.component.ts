import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'shared-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})
/**
 * Component of markdown editor. Has two tabs. One for edit in regular text area and the other for displaying preview of parsed markdown input
 */
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
