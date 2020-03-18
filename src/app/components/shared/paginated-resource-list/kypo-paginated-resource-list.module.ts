import {NgModule} from '@angular/core';
import {KypoPaginatedResourceListComponent} from './kypo-paginated-resource-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {KypoPipesModule} from 'kypo-common';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    KypoPaginatedResourceListComponent
  ],
  imports: [
    ScrollingModule,
    MatListModule,
    MatRadioModule,
    KypoPipesModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    KypoPaginatedResourceListComponent
  ]
})
export class KypoPaginatedResourceListModule {

}
