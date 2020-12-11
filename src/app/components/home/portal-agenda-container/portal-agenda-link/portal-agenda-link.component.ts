import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AgendaPortalLink } from '../../../../model/agenda-portal-link';

@Component({
  selector: 'kypo2-portal-agenda-link',
  templateUrl: './portal-agenda-link.component.html',
  styleUrls: ['./portal-agenda-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaLinkComponent {
  @Input() portalAgendaLink: AgendaPortalLink;
  @Input() elevation: string;
  @Output() navigate: EventEmitter<string> = new EventEmitter();
  @Output() elevate: EventEmitter<string> = new EventEmitter();

  setElevation(elevation: string): void {
    this.elevate.emit(elevation);
  }

  setRoute(route: string): void {
    this.navigate.emit(route);
  }
}
