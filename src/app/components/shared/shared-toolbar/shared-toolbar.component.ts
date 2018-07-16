import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-toolbar',
  templateUrl: './shared-toolbar.component.html',
  styleUrls: ['./shared-toolbar.component.css']
})
export class SharedToolbarComponent implements OnInit {

  @Input('title') title: string;

  constructor() { }

  ngOnInit() {
  }

}
