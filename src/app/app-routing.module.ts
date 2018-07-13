import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth-guard.service";
import {LoginGuard} from "./guards/login-guard.service";
import {DesignerGuard} from "./guards/designer-guard.service";
import {OrganizerGuard} from "./guards/organizer-guard.service";
import {TraineeGuard} from "./guards/trainee-guard.service";

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: '',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: '',
    canActivate: [LoginGuard]
  },
  {
    path: 'designer',
    loadChildren: '',
    canActivate: [DesignerGuard]
  },
  {
    path: 'organizer',
    loadChildren: '',
    canActivate: [OrganizerGuard]
  },
  {
    path: 'trainee',
    loadChildren: '',
    canActivate: [TraineeGuard]
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: '**',
    // component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
