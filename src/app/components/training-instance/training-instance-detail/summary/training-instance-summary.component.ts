import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {KypoBaseComponent} from 'kypo-common';
import {TrainingInstance} from 'kypo-training-model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, takeWhile, tap} from 'rxjs/operators';
import {TrainingInstanceSummaryControls} from './training-instance-summary-controls';
import {TrainingInstanceSummaryService} from '../../../../services/training-instance/summary/training-instance-summary.service';
import {KypoControlItem} from 'kypo-controls';

/**
 * Smart component of training instance summary
 */
@Component({
  selector: 'kypo2-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceSummaryComponent extends KypoBaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;
  controls: KypoControlItem[];
  private expanded: Set<number> = new Set();

  constructor(private activeRoute: ActivatedRoute,
              private service: TrainingInstanceSummaryService) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        map(data => data.trainingInstance),
        tap(ti => {
          this.service.set(ti);
          const disabled$ = this.service.hasStarted$.pipe(map(hasStated => !hasStated));
          this.controls = TrainingInstanceSummaryControls.create(this.service, disabled$, disabled$);
        })
      );
  }

  onControlAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }
  /**
   * Opens expansion panel of index
   * @param index index of expansion panel to open
   */
  open(index: number) {
    this.expanded.add(index);
  }

  /**
   * Closes expansion panel of index
   * @param index index of expansion panel to close
   */
  close(index: number) {
    this.expanded.delete(index);
  }

  /**
   * True if expansion panel on provided index is opened, false otherwise
   * @param index index of expansion panel
   */
  isOpen(index: number): boolean {
    return this.expanded.has(index);
  }
}
