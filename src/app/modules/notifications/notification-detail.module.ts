import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  CsirtMuNotificationDetailComponent,
  CsirtMuNotificationDetailModule,
} from 'csirt-mu-layout';

@NgModule({
  imports: [
    CommonModule,
    CsirtMuNotificationDetailModule,
    RouterModule.forChild([
      {
        path: '',
        component: CsirtMuNotificationDetailComponent
      },
    ])
  ]
})
export class NotificationDetailModule {}
