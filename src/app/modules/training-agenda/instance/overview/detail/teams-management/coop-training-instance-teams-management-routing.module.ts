import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsManagementComponent } from '@crczp/training-agenda/instance-team-management';

const routes: Routes = [
    {
        path: '',
        component: TeamsManagementComponent,
    },
];

/**
 * Routing module for training instance summary
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoopTrainingInstanceTeamsManagementRoutingModule {}
