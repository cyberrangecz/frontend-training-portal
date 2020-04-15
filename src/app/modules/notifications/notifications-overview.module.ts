import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  CsirtMuNotificationOverviewComponent,
  CsirtMuNotificationOverviewModule,
  NotificationResolver
} from 'csirt-mu-layout';

@NgModule({
  imports: [
    CommonModule,
    CsirtMuNotificationOverviewModule,
    RouterModule.forChild([
      {
        path: '',
        component: CsirtMuNotificationOverviewComponent
      },
      {
        path: ':id',
        loadChildren: () => import('./notification-detail.module').then(m => m.NotificationDetailModule),
        data: { breadcrumb: 'Detail' },
        resolve: { csirtMuNotification: NotificationResolver }
      }
    ])
  ]
})
export class NotificationsOverviewModule {}
