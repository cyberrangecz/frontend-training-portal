import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdaptiveDefinitionBreadcrumbResolver } from '@cyberrangecz-platform/training-agenda/resolvers';
import { AdaptiveDefinitionSimulatorComponent } from '@cyberrangecz-platform/training-agenda/adaptive-definition-simulator';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveDefinitionSimulatorComponent,
    data: {
      title: 'Adaptive Model Simulating Tool',
    },
    resolve: {
      breadcrumb: AdaptiveDefinitionBreadcrumbResolver,
    },
  },
];

/**
 * Routing for training definition preview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveDefinitionSimulatorRoutingModule {}
