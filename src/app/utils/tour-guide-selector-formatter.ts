export class TourGuideSelectorFormatter {
  /**
   * Modifies given current route to desired format for tour guide.
   * If route contains unique ids like /training-definition/1/edit they are changed to /training-definition/detail/edit.
   * Route is then transformed to camel case TrainingDefinitionDetailEdit
   * @param route current route in application.
   */
  static format(route: string) {
    route = this.replaceIdWithKeyword(route);
    route = this.camelize(route);
    return route;
  }

  /**
   * Replaces specific ids from route with keyword - detail.
   * E.g. routes like /training-definition/1/edit are changed to /training-definition/detail/edit
   * @param route current route in application.
   */
  private static replaceIdWithKeyword(route: string): string {
    return route.replace(/[0-9]+/g, 'detail');
  }

  /**
   * Modifies given route to Camel case by removing Slash '/' and dash '-' symbol from route and uppercasing following word.
   * E.g. route /training-definition/create is modified to TrainingDefinitionCreate
   * @param route current route in application.
   */
  private static camelize(route: string): string {
    route = route.replace(/[\/]|[-]/g, ' ');
    return route
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
