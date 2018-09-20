// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  usersEndpointUri: 'http://localhost:3000/users',
  sandboxDefsEndpointUri: 'http://localhost:3000/sandbox_defs',
  trainingDefsEndpointUri: 'http://localhost:3000/training_defs/',
  trainingInstancesEndpointUri: 'http://localhost:3000/training_instances',
  trainingRunsEndpointUri: 'http://localhost:3000/training_runs',
  levelsEndpointUri: 'http://localhost:3000/levels',

  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  useMockData: true
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
