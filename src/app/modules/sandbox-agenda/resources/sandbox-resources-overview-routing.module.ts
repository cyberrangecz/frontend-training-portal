import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesPageComponent } from '@muni-kypo-crp/sandbox-agenda/sandbox-resources';

const routes: Routes = [
  {
    path: '',
    component: ResourcesPageComponent,
  },
];

/**
 * Sandbox resources overview routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxResourcesOverviewRoutingModule {}
