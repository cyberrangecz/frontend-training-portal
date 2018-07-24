import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
/**
 * 404 like component. Displays alert to user that the url is wrong and requested resource does not exist.
 */
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
