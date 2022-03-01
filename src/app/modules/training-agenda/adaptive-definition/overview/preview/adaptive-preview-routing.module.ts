import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import {
  AdaptiveDefinitionBreadcrumbResolver,
  AdaptiveDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AdaptivePreviewComponent } from '@muni-kypo-crp/training-agenda/adaptive-definition-preview';

const routes: Routes = [
  {
    path: '',
    component: AdaptivePreviewComponent,
    data: {
      title: undefined,
    },
    resolve: {
      [ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]: AdaptiveDefinitionResolver,
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
export class AdaptivePreviewRoutingModule {}
