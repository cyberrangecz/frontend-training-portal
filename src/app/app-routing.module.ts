import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {Kypo2AuthProviderPickerComponent, Kypo2NotAuthGuardService} from 'kypo2-auth';
import {HomeComponent} from './components/home/home.component';
import {
  ADMIN_GROUP_PATH,
  ADMIN_MICROSERVICE_PATH,
  ADMIN_USER_PATH,
  HOME_PATH,
  LOGIN_PATH, NOTIFICATIONS_PATH,
  SANDBOX_DEFINITION_PATH,
  SANDBOX_POOL_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from './paths';
import {AdminGuard} from './services/guards/admin-guard.service';
import {DesignerGuard} from './services/guards/designer-guard.service';
import {NotOnlyTraineeGuard} from './services/guards/only-trainee.guard.service';
import {OrganizerGuard} from './services/guards/organizer-guard.service';
import {TraineeGuard} from './services/guards/trainee-guard.service';

const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomeComponent,
    canActivate: [NotOnlyTraineeGuard]
  },
  {
    path: TRAINING_DEFINITION_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-overview/training-definition-overview.module').then(m => m.TrainingDefinitionOverviewModule),
    canActivate: [DesignerGuard],
    data: {breadcrumb: 'Training Definitions'}
  },
  {
    path: SANDBOX_DEFINITION_PATH,
    loadChildren: () => import('app/components/sandbox-definition/sandbox-definition-overview/sandbox-definition-overview.module').then(m => m.SandboxDefinitionOverviewModule),
    canActivate: [DesignerGuard],
    data: { breadcrumb: 'Sandbox Definitions' }
  },
  {
    path: TRAINING_INSTANCE_PATH,
    loadChildren: () => import('app/components/training-instance/training-instance-overview/training-instance-overview.module').then(m => m.TrainingInstanceOverviewModule),
    canActivate: [OrganizerGuard],
    data: { breadcrumb: 'Training Instances' }

  },
  {
    path: SANDBOX_POOL_PATH,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-pool-overview/sandbox-pool-overview.module').then(m => m.SandboxPoolOverviewModuleModule),
    canActivate: [OrganizerGuard],
    data: { breadcrumb: 'Sandbox Pools' }
  },
  {
    path: TRAINING_RUN_PATH,
    loadChildren: () => import('app/components/training-run/training-run-overview/training-run-overview.module').then(m => m.TrainingRunOverviewModule),
    canActivate: [TraineeGuard],
    data: { breadcrumb: 'Training Runs' }
  },
  {
    path: ADMIN_USER_PATH,
    loadChildren: () => import('app/components/administration/admin-user/admin-user.module').then(m => m.AdminUserModule),
    canActivate: [AdminGuard],
    data: { breadcrumb: 'Users' }
  },
  {
    path: ADMIN_GROUP_PATH,
    loadChildren: () => import('app/components/administration/admin-group/admin-group.module').then(m => m.AdminGroupModule),
    canActivate: [AdminGuard],
    data: { breadcrumb: 'Groups' }
  },
  {
    path: ADMIN_MICROSERVICE_PATH,
    loadChildren: () => import('app/components/administration/admin-microservice/admin-microservice.module').then(m => m.AdminMicroserviceModule),
    canActivate: [AdminGuard],
    data: { breadcrumb: 'Microservice'}
  },
  {
    path: LOGIN_PATH,
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
  {
    path: NOTIFICATIONS_PATH,
    loadChildren: () => import('./components/notifications/notifications-overview.module').then(m => m.NotificationsOverviewModule),
    data: { breadcrumb: 'Notifications'}
  },
 {
    path: '',
    redirectTo: HOME_PATH,
    pathMatch: 'full',
  },
  {
    path: 'logout-confirmed',
    redirectTo: HOME_PATH,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: true
  } as ExtraOptions)],
  exports: [RouterModule]
})
/**
 * Main routing module. Contains routes to all lazy-loaded app agendas.
 */
export class AppRoutingModule {

}
