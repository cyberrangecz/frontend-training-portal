import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH, SANDBOX_RESOURCES_PATH } from '@muni-kypo-crp/sandbox-agenda';
import { TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH, TRAINING_RUN_PATH } from '@muni-kypo-crp/training-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from '@muni-kypo-crp/user-and-group-agenda';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HOME_PATH, LOGIN_PATH, NOTIFICATIONS_PATH } from './paths';
import { OnlyTraineeGuard } from './services/guards/only-trainee.guard.service';
import { SandboxDesignerGuard } from './services/guards/sandbox-designer-guard.service';
import { SandboxOrganizerGuard } from './services/guards/sandbox-organizer-guard.service';
import { TraineeGuard } from './services/guards/trainee-guard.service';
import { TrainingDesignerGuard } from './services/guards/training-designer-guard.service';
import { TrainingOrganizerGuard } from './services/guards/training-organizer-guard.service';
import { UserAndGroupGuard } from './services/guards/user-and-group-guard.service';

const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomeComponent,
    canActivate: [OnlyTraineeGuard],
  },
  {
    path: TRAINING_DEFINITION_PATH,
    loadChildren: () =>
      import('./modules/training-agenda/definition/overview/training-definition-overview.module').then(
        (m) => m.TrainingDefinitionOverviewModule
      ),
    canActivate: [TrainingDesignerGuard],
    data: {
      breadcrumb: 'Training Definitions',
      title: 'Training Definition Overview',
    },
  },
  {
    path: SANDBOX_DEFINITION_PATH,
    loadChildren: () =>
      import('./modules/sandbox-agenda/definition/sandbox-definition-overview.module').then(
        (m) => m.SandboxDefinitionOverviewModule
      ),
    canActivate: [SandboxDesignerGuard],
    data: {
      breadcrumb: 'Sandbox Definitions',
      title: 'Sandbox Definition Overview',
    },
  },
  {
    path: TRAINING_INSTANCE_PATH,
    loadChildren: () =>
      import('./modules/training-agenda/instance/overview/training-instance-overview.module').then(
        (m) => m.TrainingInstanceOverviewModule
      ),
    canActivate: [TrainingOrganizerGuard],
    data: {
      breadcrumb: 'Training Instances',
      title: 'Training Instance Overview',
    },
  },
  {
    path: SANDBOX_POOL_PATH,
    loadChildren: () => import('./modules/sandbox-agenda/pool/pool-overview.module').then((m) => m.PoolOverviewModule),
    canActivate: [SandboxOrganizerGuard],
    data: {
      breadcrumb: 'Pools',
      title: 'Pool Overview',
    },
  },
  {
    path: SANDBOX_RESOURCES_PATH,
    loadChildren: () =>
      import('./modules/sandbox-agenda/resources/sandbox-resources.module').then(
        (m) => m.SandboxResourcesOverviewModule
      ),
    canActivate: [SandboxOrganizerGuard],
    data: {
      breadcrumb: 'Resources',
      title: 'Resources Overview',
    },
  },
  {
    path: TRAINING_RUN_PATH,
    loadChildren: () =>
      import('./modules/training-agenda/run/overview/training-run-overview.module').then(
        (m) => m.TrainingRunOverviewModule
      ),
    canActivate: [TraineeGuard],
    data: {
      breadcrumb: 'Training Runs',
      title: 'Training Run Overview',
    },
  },
  {
    path: USER_PATH,
    loadChildren: () =>
      import('./modules/user-and-group-agenda/user/user-overview.module').then((m) => m.UserOverviewModule),
    canActivate: [UserAndGroupGuard],
    data: {
      breadcrumb: 'Users',
      title: 'User Overview',
    },
  },
  {
    path: GROUP_PATH,
    loadChildren: () =>
      import('./modules/user-and-group-agenda/group/group-overview.module').then((m) => m.GroupOverviewModule),
    canActivate: [UserAndGroupGuard],
    data: {
      breadcrumb: 'Groups',
      title: 'Group Overview',
    },
  },
  {
    path: MICROSERVICE_PATH,
    loadChildren: () =>
      import('./modules/user-and-group-agenda/microservice/microservice-overview.module').then(
        (m) => m.MicroserviceOverviewModule
      ),
    canActivate: [UserAndGroupGuard],
    data: {
      breadcrumb: 'Microservice',
      title: 'Microservice Overview',
    },
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent,
    canActivate: [SentinelNegativeAuthGuard],
  },
  {
    path: NOTIFICATIONS_PATH,
    canActivate: [SentinelAuthGuardWithLogin],
    loadChildren: () =>
      import('./modules/notifications/notifications-overview.module').then((m) => m.NotificationsOverviewModule),
    data: { breadcrumb: 'Notifications', title: 'Notifications' },
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
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking',
    } as ExtraOptions),
  ],
  exports: [RouterModule],
})
/**
 * Main routing module. Contains routes to all lazy-loaded app agendas.
 */
export class AppRoutingModule {}
