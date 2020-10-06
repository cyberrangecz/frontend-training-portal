import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgendaPortalLink } from '../../../../model/agenda-portal-link';

@Component({
  selector: 'kypo2-portal-agenda-link',
  templateUrl: './portal-agenda-link.component.html',
  styleUrls: ['./portal-agenda-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaLinkComponent implements OnInit {
  @Input() portalAgendaLink: AgendaPortalLink;
  @Input() elevation: string;
  @Output() navigate: EventEmitter<string> = new EventEmitter();
  @Output() elevate: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setElevation(elevation: string) {
    this.elevate.emit(elevation);
  }

  setRoute(route: string) {
    this.navigate.emit(route);
  }
}
