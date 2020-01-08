import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingInstance} from '../../../model/training/training-instance';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css']
})
/**
 * Main component of organizer overview.
 */
export class TrainingInstanceOverviewComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Navigates to page for creating new training instance or editing existing
   * @param trainingInstance training instance to edit, null if new should be created
   */
  onNavigateToEdit(trainingInstance: TrainingInstance = null) {
    if (trainingInstance) {
      this.router.navigate([RouteFactory.toTrainingInstanceEdit(trainingInstance.id)]);
    } else {
      this.router.navigate([RouteFactory.toNewTrainingInstance()]);
    }
  }
}
