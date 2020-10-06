import { AgendaPortalLink } from './agenda-portal-link';
import { AgendaContainer } from '@sentinel/layout';

export class PortalAgendaContainer extends AgendaContainer {
  agendas: AgendaPortalLink[];
  displayed: boolean;
}
