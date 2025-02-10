import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@cyberrangecz-platform/training-agenda/mitre-techniques';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MitreTechniquesComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    MitreTechniquesRoutingModule,
  ],
})
export class MitreTechniquesModule {}
