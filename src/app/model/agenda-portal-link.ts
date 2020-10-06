import { Agenda } from '@sentinel/layout';

export class AgendaPortalLink extends Agenda {
  disabled: boolean;
  description: string;
  icon: string;

  constructor(name: string, disabled: boolean, route: string, description: string, icon: string) {
    super(name, route);
    this.disabled = disabled;
    this.description = description;
    this.icon = icon;
  }
}
