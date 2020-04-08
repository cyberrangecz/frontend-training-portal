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
import {SandboxDesignerGuard} from './services/guards/sandbox-designer-guard.service';
import {SandboxOrganizerGuard} from './services/guards/sandbox-organizer-guard.service';

const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomeComponent,
    canActivate: [NotOnlyTraineeGuard]
  },
  {
    path: TRAINING_DEFINITION_PATH,
    loadChildren: () => import('./modules/training-agenda/definition/overview/training-definition-overview.module').then(m => m.TrainingDefinitionOverviewModule),
    canActivate: [DesignerGuard],
    data: {
      breadcrumb: 'Training Definitions',
      title: 'Training Definition Overview'
    }
  },
  {
    path: SANDBOX_DEFINITION_PATH,
    loadChildren: () => import('./modules/sandbox-agenda/sandbox-definition/sandbox-definition-overview.module').then(m => m.SandboxDefinitionOverviewModule),
    canActivate: [SandboxDesignerGuard],
    data: {
      breadcrumb: 'Sandbox Definitions',
      title: 'Sandbox Definition Overview'
    }
  },
  {
    path: TRAINING_INSTANCE_PATH,
    loadChildren: () => import('./modules/training-agenda/instance/overview/training-instance-overview.module').then(m => m.TrainingInstanceOverviewModule),
    canActivate: [OrganizerGuard],
    data: {
      breadcrumb: 'Training Instances',
      title: 'Training Instance Overview'
    }
  },
  {
    path: SANDBOX_POOL_PATH,
    loadChildren: () => import('./modules/sandbox-agenda/pool/sandbox-pool-overview.module').then(m => m.SandboxPoolOverviewModule),
    canActivate: [SandboxOrganizerGuard],
    data: {
      breadcrumb: 'Pools',
      title: 'Pool Overview'
    }
  },
  {
    path: TRAINING_RUN_PATH,
    loadChildren: () => import('./modules/training-agenda/run/overview/training-run-overview.module').then(m => m.TrainingRunOverviewModule),
    canActivate: [TraineeGuard],
    data: {
      breadcrumb: 'Training Runs',
      title: 'Training Run Overview'
    }
  },
  {
    path: ADMIN_USER_PATH,
    loadChildren: () => import('app/components/administration/admin-user/admin-user.module').then(m => m.AdminUserModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'Users',
      title: 'User Overview'
    }
  },
  {
    path: ADMIN_GROUP_PATH,
    loadChildren: () => import('app/components/administration/admin-group/admin-group.module').then(m => m.AdminGroupModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'Groups',
      title: 'Group Overview'
    }
  },
  {
    path: ADMIN_MICROSERVICE_PATH,
    loadChildren: () => import('app/components/administration/admin-microservice/admin-microservice.module').then(m => m.AdminMicroserviceModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'Microservice',
      title: 'Microservice Registration'
    }
  },
  {
    path: LOGIN_PATH,
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
  {
    path: NOTIFICATIONS_PATH,
    loadChildren: () => import('./modules/notifications/notifications-overview.module').then(m => m.NotificationsOverviewModule),
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
