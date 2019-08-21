import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ActiveUserComponent} from './active-user/active-user.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';
import {LayoutMaterialModule} from './layout-material.module';
import {MatSidenavModule} from '@angular/material';
import {UserIdModule} from '../shared/user-id.module';
import { TreeNavigationComponent } from './tree-navigation/tree-navigation.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutMaterialModule,
    UserIdModule
  ],
  declarations: [
    ToolbarComponent,
    ActiveUserComponent,
    SidenavComponent,
    TreeNavigationComponent,
    UserMenuComponent,
  ],
  exports: [
    ToolbarComponent,
    ActiveUserComponent,
    SidenavComponent,
    MatSidenavModule,
  ],
})

export class LayoutModule {

}
