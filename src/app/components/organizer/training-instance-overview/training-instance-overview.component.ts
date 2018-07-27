import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css']
})
export class TrainingInstanceOverviewComponent implements OnInit {

  navLinks = [
    {
      path: 'summary',
      icon: 'list_alt',
      label: 'Summary'
    },
    {
      path: 'progress',
      icon: 'timeline',
      label: 'Progress'
    }
    ];

  nestedNavLinks = [
    {
      path: 'results',
      secondaryPath: 'visualization',
      icon: 'assessment',
      label: 'Results'
    }
    ];

  constructor() { }

  ngOnInit() {
  }

}
