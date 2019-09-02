import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../../base.component';
import {
  VIZ_ASSESSMENTS_PATH,
  VIZ_COMBINED_PATH, VIZ_PROGRESS_PATH,
  VIZ_SCORE_DEVELOPMENT_PATH,
  VIZ_SCORE_SCATTER_PLOT_PATH
} from './paths';

@Component({
  selector: 'kypo2-training-instance-results',
  templateUrl: './training-instance-results.component.html',
  styleUrls: ['./training-instance-results.component.css']
})
/**
 * Wrapper for training results menu and navigation between selected visualizations
 */
export class TrainingInstanceResultsComponent extends BaseComponent implements OnInit {

  readonly SCORE_DEVELOPMENT = VIZ_SCORE_DEVELOPMENT_PATH;
  readonly SCATTER_PLOT = VIZ_SCORE_SCATTER_PLOT_PATH;
  readonly ASSESSMENTS = VIZ_ASSESSMENTS_PATH;
  readonly COMBINED = VIZ_COMBINED_PATH;
  readonly PROGRESS = VIZ_PROGRESS_PATH;

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
