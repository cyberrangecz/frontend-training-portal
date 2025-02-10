import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crczp-portal-agenda-description',
  templateUrl: './portal-agenda-description.component.html',
  styleUrls: ['./portal-agenda-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaDescriptionComponent {
  @Input() label: string;
  @Input() description: string;
  @Input() elevation: string;
  @Input() disabled: boolean;
  @Output() elevate: EventEmitter<string> = new EventEmitter();

  setElevation(agendaLabel: string): void {
    this.elevate.emit(agendaLabel);
  }
}
