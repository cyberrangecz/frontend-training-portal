import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeMaterialModule} from './home-material.module';

/**
 * Portal main page module
 */
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
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
