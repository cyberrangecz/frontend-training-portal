import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'designer-overview',
  templateUrl: './designer-overview.component.html',
  styleUrls: ['./designer-overview.component.css']
})
/**
 * Main component of designer overview. Serves mainly as a wrapper for smaller components
 */
export class DesignerOverviewComponent extends BaseComponent implements OnInit {

  ngOnInit() {
  }

}
