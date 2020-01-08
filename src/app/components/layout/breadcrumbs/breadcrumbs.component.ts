import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Observable, of} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Breadcrumb} from '../../../model/breadcrumb/breadcrumb';
import {BreadcrumbBuilderService} from '../../../services/breadcrumbs/breadcrumb-builder.service';
import {BaseComponent} from '../../base.component';

/**
 * Builds and displays breadcrumbs on every change of navigation
 */
@Component({
  selector: 'kypo2-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]> = of([]);

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private breadcrumbBuilder: BreadcrumbBuilderService ) {
    super();
  }

  ngOnInit() {
    this.breadcrumbs$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(_ => this.breadcrumbBuilder.build(this.activeRoute)),
      );
  }
}
