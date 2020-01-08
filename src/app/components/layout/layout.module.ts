import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BreadcrumbBuilderService} from '../../services/breadcrumbs/breadcrumb-builder.service';
import {UserIdModule} from '../shared/user-id/user-id.module';
import {ActiveUserComponent} from './active-user/active-user.component';
import { BreadcrumbsPresentationalComponent } from './breadcrumbs/breadcrumbs-presentational/breadcrumbs-presentational.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {LayoutMaterialModule} from './layout-material.module';
import { LoadingComponent } from './loading/loading.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import { TreeNavigationComponent } from './tree-navigation/tree-navigation.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { FooterComponent } from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';

/**
 * Module containing all layout related components
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutMaterialModule,
    UserIdModule,

  ],
  declarations: [
    ToolbarComponent,
    ActiveUserComponent,
    SidenavComponent,
    TreeNavigationComponent,
    UserMenuComponent,
    BreadcrumbsComponent,
    BreadcrumbsPresentationalComponent,
    LoadingComponent,
    FooterComponent,
  ],
  exports: [
    ToolbarComponent,
    ActiveUserComponent,
    SidenavComponent,
    LoadingComponent,
    FooterComponent,
    MatSidenavModule
  ],
  providers: [
    BreadcrumbBuilderService
  ]
})

export class LayoutModule {

}
