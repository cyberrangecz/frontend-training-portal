// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  usersEndpointUri: 'assets/sample-data/test-users.json',
  sandboxDefsEndpointUri: 'assets/sample-data/test-sandbox-defs.json',
  trainingDefsEndpointUri: 'assets/sample-data/test-training-defs.json',
  trainingInstancesEndpointUri: 'assets/sample-data/test-training-instances.json',
  trainingRunsEndpointUri: 'assets/sample-data/test-training-runs.json',
  levelsEndpointUri: 'assets/sample-data/test-levels.json',

  defaultAlertDuration: 2500 // 0 to display until user dismisses it
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
