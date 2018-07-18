import { Component, OnInit } from '@angular/core';
import {TrainingDefinition} from "../../../model/training/training-definition";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {Observable} from "rxjs/internal/Observable";


@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
export class TrainingDefinitionComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {

  }

  ngOnInit() {
    this.trainingDefinition$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        const id = +params.get('id');
        return id === null ? null : this.trainingDefinitionGetter.getTrainingDefById(id);
      }));
  }

}
