import {NgModule} from "@angular/core";
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DesignerGuard} from "./services/guards/designer-guard.service";
import {OrganizerGuard} from "./services/guards/organizer-guard.service";
import {TraineeGuard} from "./services/guards/trainee-guard.service";
import {AdminGuard} from './services/guards/admin-guard.service';
import {
  Kypo2AuthGuardWithLogin,
  Kypo2AuthProviderPickerComponent,
  Kypo2NotAuthGuardService
} from 'kypo2-auth';
import {NotOnlyTraineeGuard} from "./services/guards/only-trainee.guard.service";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('app/components/portal/portal.module').then(m => m.PortalModule),
    canActivate: [NotOnlyTraineeGuard]
  },
  {
    path: 'designer',
    loadChildren: () => import('app/components/designer/designer-overview/designer-overview.module').then(m => m.DesignerOverviewModule),
    canActivate: [DesignerGuard]
  },
  {
    path: 'organizer',
    loadChildren: () => import('app/components/organizer/organizer-overview/organizer-overview.module').then(m => m.OrganizerOverviewModule),
    canActivate: [OrganizerGuard]
  },
  {
    path: 'trainee',
    loadChildren: () => import('app/components/trainee/trainee-overview/trainee-overview.module').then(m => m.TraineeOverviewModule),
    canActivate: [TraineeGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('app/components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
 {
    path: '',
    redirectTo: 'home',
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
