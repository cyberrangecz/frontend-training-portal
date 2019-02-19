import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * Main toolbar of the application. Shows logo and a user menu component
 */
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
