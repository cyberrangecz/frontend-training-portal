import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomelRoutingModule} from './homel-routing.module';
import {HomeMaterialModule} from './home-material.module';

@NgModule({
  imports: [
    CommonModule,
    HomelRoutingModule,
    HomeMaterialModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [

  ]
})

export class HomeModule {

}
