import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import {ActiveTrainingRunService} from '../../../../services/training-run/active-training-run.service';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-abstract-level',
  templateUrl: './abstract-level.component.html',
  styleUrls: ['./abstract-level.component.css']
})
/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
export class AbstractLevelComponent extends BaseComponent implements OnInit {

  level$: Observable<AbstractLevel>;
  levelTypes = AbstractLevelTypeEnum;

  constructor(private activeLevelsService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.level$ = this.activeLevelsService.activeLevel$;
  }
  /**
   * Shows dialog asking the user if he really wants to leave the page after clicking on back button
   */
  @HostListener('window:onpopstate')
  canGoBack(): boolean {
    return confirm('WARNING: You may lose progress in the current level. Do you really want to leave?');
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return confirm('WARNING: You may lose progress in the current level. Do you really want to leave?');
  }

}
