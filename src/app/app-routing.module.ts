import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
