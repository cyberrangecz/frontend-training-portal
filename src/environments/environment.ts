// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  usersEndpointUri: 'http://localhost:3000/users/',
  sandboxDefsEndpointUri: 'http://localhost:3000/sandbox-definitions/',
  trainingDefsEndpointUri: 'http://localhost:3000/training-definitions/',
  trainingInstancesEndpointUri: 'http://localhost:3000/training-instances/',
  trainingRunsEndpointUri: 'http://localhost:3000/training-runs/',
  levelsEndpointUri: 'http://localhost:3000/levels/',

  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: '948f6e8f-929f-479f-a24e-f42b2fcd22ec',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  sessionChecksEnabled: false,

  // URL of the public source to to test GET request
  requestWithoutAuthUri: 'http://localhost:8080/',

  // URL of the secured source to test GET request
  requestWithAuthUri: 'http://localhost:8080/private',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
