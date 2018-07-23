import { Component, OnInit } from '@angular/core';
import {TrainingDefinition} from "../../../model/training/training-definition";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";


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

  levels$: Observable<AbstractLevel[]>;
  trainingDefId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private levelGetter: LevelGetterService) {

  }

  ngOnInit() {
    this.getTrainingDefFromUrl();
    this.getLevelsByTrainingDefFromUrl();
  }

  /**
   * Gets training definition from url parameter and passes it to child component
   */
  private getTrainingDefFromUrl() {
    this.trainingDefinition$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        this.trainingDefId = +params.get('id');
        return this.trainingDefId === null ? null : this.trainingDefinitionGetter.getTrainingDefById(this.trainingDefId);
      }));
  }

  /**
   * Gets levels assigned to the training definition specified in url parameter and passes it to child component
   */
  private getLevelsByTrainingDefFromUrl() {
    this.levels$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        const id = +params.get('id');
        return id === null ? null : this.levelGetter.getLevelsByTrainingDefId(id);
      }));
  }

}
