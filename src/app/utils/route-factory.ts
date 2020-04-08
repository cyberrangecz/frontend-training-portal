import {Kypo2UserAndGroupRouteEvent} from 'kypo2-user-and-group-management';
/**
 * Class containing all possible routes in the system. Use absolute routing
 */
export class RouteFactory {

  /**
   * Transforms user and group library events to app routes
   * @param routeEvent event emitted from the library
   */
  static parseUserAndGroupRouteEvent(routeEvent: Kypo2UserAndGroupRouteEvent): string {
    let route = `${routeEvent.resourceType.toLowerCase()}/`;
    if (routeEvent.resourceId !== undefined && routeEvent.resourceId !== null) {
      route += `${routeEvent.resourceId}/`;
    }
    if (routeEvent.actionType) {
      route += RouteFactory.parseUserAndGroupActionType(routeEvent.actionType);
    }
    return route;
  }

  private static parseUserAndGroupActionType(actionType: 'EDIT' | 'NEW' | 'DETAIL') {
    if (actionType === 'EDIT') {
      return 'edit/';
    }
    if (actionType === 'NEW') {
      return 'create/';
    }
    if (actionType === 'DETAIL') {
      console.error('USER AND GROUP ActionType of "DETAIL" not supported!');
      return '';
    }
  }
}
