import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingInstanceDetailComponent } from './training-instance-detail.component';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailMaterialModule} from './training-instance-detail-material.module';
import {TrainingInstanceGuardService} from '../../../services/guards/training-instance-guard.service';

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
    TrainingInstanceGuardService
  ]
})

export class TrainingInstanceDetailModule {

}
