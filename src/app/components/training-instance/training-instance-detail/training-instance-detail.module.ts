import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingInstanceGuard} from '../../../services/guards/training-instance-guard.service';
import {TrainingInstanceDetailMaterialModule} from './training-instance-detail-material.module';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import { TrainingInstanceDetailComponent } from './training-instance-detail.component';

/**
 * Module containing components and routing for training instance detail agenda
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetailRoutingModule,
    TrainingInstanceDetailMaterialModule
  ],
  declarations: [
  TrainingInstanceDetailComponent
  ],
  providers: [
    TrainingInstanceGuard
  ]
})

export class TrainingInstanceDetailModule {

}
