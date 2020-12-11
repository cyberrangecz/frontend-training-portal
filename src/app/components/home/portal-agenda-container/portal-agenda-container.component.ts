import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PortalAgendaContainer } from '../../../model/portal-agenda-container';

@Component({
  selector: 'kypo2-portal-agenda-container',
  templateUrl: './portal-agenda-container.component.html',
  styleUrls: ['./portal-agenda-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaContainerComponent {
  @Input() portalAgendaContainer: PortalAgendaContainer;
  @Input() elevation: string;
  @Input() isLast: boolean;

  @Output() navigation: EventEmitter<string> = new EventEmitter();
  @Output() setElevation: EventEmitter<string> = new EventEmitter();

  elevate(event: string): void {
    this.setElevation.emit(event);
  }

  navigate(event: string): void {
    this.navigation.emit(event);
  }
}
