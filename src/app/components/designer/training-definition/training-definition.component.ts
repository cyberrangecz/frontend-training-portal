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
/**
 * Main component of training definition. Servers mainly as a wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {

  }

  ngOnInit() {
    this.getTrainingDefFromUrl();
  }

  /**
   * Gets training definition from url parameter and passes it to child components.
   */
  private getTrainingDefFromUrl() {
    this.trainingDefinition$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        const id = +params.get('id');
        return id === null ? null : this.trainingDefinitionGetter.getTrainingDefById(id);
      }));
  }

}
