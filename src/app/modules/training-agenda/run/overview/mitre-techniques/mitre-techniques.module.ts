import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@crczp/training-agenda/mitre-techniques';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MitreTechniquesComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        MitreTechniquesRoutingModule,
    ],
})
export class MitreTechniquesModule {}
