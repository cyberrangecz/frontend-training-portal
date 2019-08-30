import {Component, Input, OnInit} from '@angular/core';
import {LevelDetailAdapter} from '../../../../../../model/level/level-detail-adapter';
import {Router} from '@angular/router';

@Component({
  selector: 'kypo2-training-definition-detail-levels-presentation',
  templateUrl: './training-definition-detail-levels-presentation.component.html',
  styleUrls: ['./training-definition-detail-levels-presentation.component.css']
})
export class TrainingDefinitionDetailLevelsPresentationComponent implements OnInit {

  @Input() levels: LevelDetailAdapter[];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(detailRoute: string) {
    this.router.navigate([detailRoute]);
  }
}
