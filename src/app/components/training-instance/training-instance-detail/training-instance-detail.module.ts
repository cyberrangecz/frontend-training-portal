import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingInstanceGuard} from '../../../services/guards/training-instance-guard.service';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailBreadcrumbResolver} from '../../../services/resolvers/training-instance-detail-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';

/**
 * Module containing components and routing for training instance detail agenda
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingInstanceGuard,
    TrainingInstanceResolver,
    TrainingInstanceDetailBreadcrumbResolver
  ]
})

export class TrainingInstanceDetailModule {

}
