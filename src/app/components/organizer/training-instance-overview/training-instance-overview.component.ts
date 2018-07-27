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
      label: 'Summary'
    },
    {
      path: 'progress',
      label: 'Progress'
    },
    {
      path: 'results',
      label: 'Results'
    }
    ];

  constructor() { }

  ngOnInit() {
  }

}
