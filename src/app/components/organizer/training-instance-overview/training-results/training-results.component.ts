import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'training-results',
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.css']
})
export class TrainingResultsComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { view: 'score-development' } }], {relativeTo: this.activeRoute});
  }

  navigateTo(path: string) {
    this.router.navigate([{ outlets: { view: path } }], {relativeTo: this.activeRoute});
  }
}
