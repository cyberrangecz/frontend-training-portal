import {Injectable} from '@angular/core';
import {TrainingInstance} from '../../../model/training/training-instance';
import {from, Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';

@Injectable()
export class TrainingInstanceSummaryService {

  hasStarted$: Observable<boolean>;
  private trainingInstance: TrainingInstance;

  constructor(private router: Router) {
  }

  set(ti: TrainingInstance) {
    this.trainingInstance = ti;
    this.hasStarted$ = timer(0, 60000)
      .pipe(
        map(_ => this.trainingInstance.hasStarted())
      );
  }

  showProgress(): Observable<boolean> {
    return from(this.router.navigate([RouteFactory.toTrainingInstanceProgress(this.trainingInstance.id)]));
  }

  showResults(): Observable<any> {
    return from(this.router.navigate([RouteFactory.toTrainingInstanceResults(this.trainingInstance.id)]));
  }
}
