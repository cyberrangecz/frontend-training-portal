import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PortalAgendaContainer } from '../../../model/portal-agenda-container';

@Component({
  selector: 'kypo2-portal-agenda-container',
  templateUrl: './portal-agenda-container.component.html',
  styleUrls: ['./portal-agenda-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaContainerComponent implements OnInit {
  @Input() portalAgendaContainer: PortalAgendaContainer;
  @Input() elevation: string;
  @Input() isLast: boolean;

  @Output() navigation: EventEmitter<string> = new EventEmitter();
  @Output() setElevation: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  elevate(event: string) {
    this.setElevation.emit(event);
  }

  navigate(event: string) {
    this.navigation.emit(event);
  }
}
