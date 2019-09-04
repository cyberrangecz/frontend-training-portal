import {Component, Input, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../model/breadcrumb/breadcrumb';
import {HOME_PATH} from '../../../../paths';

@Component({
  selector: 'kypo2-breadcrumbs-presentational',
  templateUrl: './breadcrumbs-presentational.component.html',
  styleUrls: ['./breadcrumbs-presentational.component.scss']
})
export class BreadcrumbsPresentationalComponent implements OnInit {

  HOME_PATH = HOME_PATH;

  @Input() breadcrumbs: Breadcrumb[] = [];

  constructor() { }

  ngOnInit() {
  }
}
