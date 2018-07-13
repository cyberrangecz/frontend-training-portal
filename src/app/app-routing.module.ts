import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: ''
  },
  {
    path: 'login',
    loadChildren: ''
  },
  {
    path: 'designer',
    loadChildren: ''
  },
  {
    path: 'organizer',
    loadChildren: ''
  },
  {
    path: 'trainee',
    loadChildren: ''
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
