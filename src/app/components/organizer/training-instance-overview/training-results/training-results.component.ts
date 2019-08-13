import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'training-results',
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.css']
})
/**
 * Wrapper for training results menu and navigation between selected visualizations
 */
export class TrainingResultsComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Navigates to specific component in view outlet
   * @param {string} path path to the requested component
   */
  navigateTo(path: string) {
    this.router.navigate([{ outlets: { view: path } }], {relativeTo: this.activeRoute});
  }
}
