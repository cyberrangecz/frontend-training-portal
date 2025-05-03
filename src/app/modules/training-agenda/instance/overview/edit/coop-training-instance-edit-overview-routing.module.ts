import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    CoopTrainingInstanceEditOverviewComponent,
    TrainingInstanceCanDeactivate,
} from '@crczp/training-agenda/instance-edit';

const routes: Routes = [
    {
        path: '',
        component: CoopTrainingInstanceEditOverviewComponent,
        canDeactivate: [TrainingInstanceCanDeactivate<CoopTrainingInstanceEditOverviewComponent>],
    },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoopTrainingInstanceEditOverviewRoutingModule {}
