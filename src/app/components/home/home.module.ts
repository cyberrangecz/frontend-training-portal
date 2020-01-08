import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeMaterialModule} from './home-material.module';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';

/**
 * Portal home page module
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
