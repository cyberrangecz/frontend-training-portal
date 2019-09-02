import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingInstanceDetailComponent } from './training-instance-detail.component';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailMaterialModule} from './training-instance-detail-material.module';
import {TrainingInstanceGuard} from '../../../services/guards/training-instance-guard.service';

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
