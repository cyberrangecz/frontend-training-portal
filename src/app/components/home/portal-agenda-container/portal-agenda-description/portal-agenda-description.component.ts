import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kypo2-portal-agenda-description',
  templateUrl: './portal-agenda-description.component.html',
  styleUrls: ['./portal-agenda-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAgendaDescriptionComponent implements OnInit {
  @Input() label: string;
  @Input() description: string;
  @Input() elevation: string;
  @Input() disabled: boolean;
  @Output() elevate: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  setElevation(agendaLabel: string) {
    this.elevate.emit(agendaLabel);
  }
}
