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
 * Main component of organizer overview. Wrapper for child components (definition of new training instance and overivew of  existing training instances)
 */
export class TrainingInstanceOverviewComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }

  onNavigateToEdit(trainingInstance: TrainingInstance = null) {
    if (trainingInstance) {
      this.router.navigate([RouteFactory.toTrainingInstanceEdit(trainingInstance.id)]);
    } else {
      this.router.navigate([RouteFactory.toNewTrainingInstance()]);
    }
  }
}
