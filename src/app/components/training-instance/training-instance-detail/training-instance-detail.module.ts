import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailBreadcrumbResolver} from '../../../services/resolvers/training-instance-detail-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';

/**
 * Module containing components and providers for training instance detail agenda
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingInstanceResolver,
    TrainingInstanceDetailBreadcrumbResolver
  ]
})

export class TrainingInstanceDetailModule {

}
