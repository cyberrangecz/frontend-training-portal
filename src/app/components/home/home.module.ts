import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeMaterialModule } from './home-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PortalAgendaContainerComponent } from './portal-agenda-container/portal-agenda-container.component';
import { PortalAgendaDescriptionComponent } from './portal-agenda-container/portal-agenda-description/portal-agenda-description.component';
import { PortalAgendaLinkComponent } from './portal-agenda-container/portal-agenda-link/portal-agenda-link.component';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Portal home page module
 */
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeMaterialModule,
    MatIconModule,
    SentinelControlsComponent,
    MatMenuModule,
  ],
  declarations: [
    HomeComponent,
    PortalAgendaContainerComponent,
    PortalAgendaLinkComponent,
    PortalAgendaDescriptionComponent,
  ],
  providers: [],
})
export class HomeModule {}
