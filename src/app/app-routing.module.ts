import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth-guard.service";
import {LoginGuard} from "./guards/login-guard.service";
import {DesignerGuard} from "./guards/designer-guard.service";
import {OrganizerGuard} from "./guards/organizer-guard.service";
import {TraineeGuard} from "./guards/trainee-guard.service";
import {NotFoundComponent} from "./components/shared/not-found/not-found.component";
import {NotAuthorizedComponent} from "./components/shared/not-authorized/not-authorized.component";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/components/portal/portal.module#PortalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/components/login/login.module#LoginModule',
    canActivate: [LoginGuard]
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
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
