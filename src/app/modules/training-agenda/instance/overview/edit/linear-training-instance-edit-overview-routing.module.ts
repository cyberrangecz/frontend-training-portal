import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    LinearTrainingInstanceEditOverviewComponent,
    TrainingInstanceCanDeactivate,
} from '@crczp/training-agenda/instance-edit';

const routes: Routes = [
    {
        path: '',
        component: LinearTrainingInstanceEditOverviewComponent,
        canDeactivate: [TrainingInstanceCanDeactivate<LinearTrainingInstanceEditOverviewComponent>],
    },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LinearTrainingInstanceEditOverviewRoutingModule {}
