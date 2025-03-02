import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelNotificationDetailComponent, SentinelNotificationDetailModule } from '@sentinel/layout/notification';

@NgModule({
    imports: [
        CommonModule,
        SentinelNotificationDetailModule,
        RouterModule.forChild([
            {
                path: '',
                component: SentinelNotificationDetailComponent,
            },
        ]),
    ],
})
export class NotificationDetailModule {}
