import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingRunLevelsDeactivateGuard } from '@crczp/training-agenda/run-detail';
import { CoopTrainingRunDetailComponent } from '@crczp/training-agenda/run-detail';

const routes: Routes = [
    {
        path: '',
        component: CoopTrainingRunDetailComponent,
        canDeactivate: [TrainingRunLevelsDeactivateGuard],
    },
];

/**
 * Routing for training run detail module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoopTrainingRunDetailRoutingModule {}
