import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../../../base.component';
import {LevelDetailAdapter} from '../../../../../model/level/level-detail-adapter';
import {RouteFactory} from '../../../../../model/routes/route-factory';
import {Observable} from 'rxjs';
import {TrainingDefinitionFacade} from '../../../../../services/facades/training-definition-facade.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-detail.component.html',
  styleUrls: ['./training-definition-detail.component.css']
})
export class TrainingDefinitionDetailComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingDefinition: TrainingDefinition;
  levels$: Observable<LevelDetailAdapter[]>;

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes && this.trainingDefinition) {
      this.levels$ = this.trainingDefinitionFacade.getTrainingDefinitionById(this.trainingDefinition.id, true)
        .pipe(
          map(td => td.levels
            .map(level => new LevelDetailAdapter(level, RouteFactory.levelDetail(this.trainingDefinition.id, level.id)))
          )
        );
    }
  }
}
