import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeMaterialModule } from './home-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { PortalAgendaContainerComponent } from './portal-agenda-container/portal-agenda-container.component';
import { PortalAgendaLinkComponent } from './portal-agenda-container/portal-agenda-link/portal-agenda-link.component';
import { PortalAgendaDescriptionComponent } from './portal-agenda-container/portal-agenda-description/portal-agenda-description.component';

/**
 * Portal home page module
 */
@NgModule({
  imports: [CommonModule, HomeRoutingModule, HomeMaterialModule, MatIconModule],
  declarations: [
    HomeComponent,
    PortalAgendaContainerComponent,
    PortalAgendaLinkComponent,
    PortalAgendaDescriptionComponent,
  ],
  providers: [],
})
export class HomeModule {}
