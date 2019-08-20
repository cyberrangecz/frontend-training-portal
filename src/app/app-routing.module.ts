import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DesignerGuard} from './services/guards/designer-guard.service';
import {OrganizerGuard} from './services/guards/organizer-guard.service';
import {TraineeGuard} from './services/guards/trainee-guard.service';
import {AdminGuard} from './services/guards/admin-guard.service';
import {
  Kypo2AuthProviderPickerComponent,
  Kypo2NotAuthGuardService
} from 'kypo2-auth';
import {NotOnlyTraineeGuard} from './services/guards/only-trainee.guard.service';
import {
  ADMIN_GROUP_PATH,
  ADMIN_USER_PATH,
  HOME_PATH,
  LOGIN_PATH, SANDBOX_DEFINITION_PATH,
  SANDBOX_POOL_PATH, TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from "./paths";

const routes: Routes = [
  {
    path: HOME_PATH,
    loadChildren: () => import('app/components/home/home.module').then(m => m.HomeModule),
    canActivate: [NotOnlyTraineeGuard]
  },
  {
    path: TRAINING_DEFINITION_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-overview/training-defininition-overview.module').then(m => m.TrainingDefininitionOverviewModule),
    canActivate: [DesignerGuard]
  },
  {
    path: SANDBOX_DEFINITION_PATH,
    loadChildren: () => import('app/components/sandbox-definition/sandbox-defininition-overview.module').then(m => m.SandboxDefininitionOverviewModule),
    canActivate: [DesignerGuard]
  },
  {
    path: TRAINING_INSTANCE_PATH,
    loadChildren: () => import('app/components/training-instance/training-instance-overview/training-instance-overview.module').then(m => m.TrainingInstanceOverviewModule),
    canActivate: [OrganizerGuard]
  },
  {
    path: SANDBOX_POOL_PATH,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-pool-overview/sandbox-pool-overview.module').then(m => m.SandboxPoolOverviewModuleModule),
    canActivate: [OrganizerGuard]
  },
  {
    path: TRAINING_RUN_PATH,
    loadChildren: () => import('app/components/training-run/training-run-overview/training-run-overview.module').then(m => m.TrainingRunOverviewModule),
    canActivate: [TraineeGuard]
  },
  {
    path: ADMIN_USER_PATH,
    loadChildren: () => import('app/components/admin-user/admin-user.module').then(m => m.AdminUserModule),
    canActivate: [AdminGuard]
  },
  {
    path: ADMIN_GROUP_PATH,
    loadChildren: () => import('app/components/admin-group/admin-group.module').then(m => m.AdminGroupModule),
    canActivate: [AdminGuard]
  },
  {
    path: LOGIN_PATH,
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
 {
    path: '',
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

export class AppRoutingModule {

}
