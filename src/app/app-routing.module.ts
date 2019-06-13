import {NgModule} from "@angular/core";
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/guards/auth-guard.service";
import {DesignerGuard} from "./services/guards/designer-guard.service";
import {OrganizerGuard} from "./services/guards/organizer-guard.service";
import {TraineeGuard} from "./services/guards/trainee-guard.service";
import {AdminGuard} from './services/guards/admin-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/components/portal/portal.module#PortalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'designer',
    loadChildren: 'app/components/designer/designer-overview/designer-overview.module#DesignerOverviewModule',
    canActivate: [DesignerGuard]
  },
  {
    path: 'organizer',
    loadChildren: 'app/components/organizer/organizer-overview/organizer-overview.module#OrganizerOverviewModule',
    canActivate: [OrganizerGuard]
  },
  {
    path: 'trainee',
    loadChildren: 'app/components/trainee/trainee-overview/trainee-overview.module#TraineeOverviewModule',
    canActivate: [TraineeGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/components/admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
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
