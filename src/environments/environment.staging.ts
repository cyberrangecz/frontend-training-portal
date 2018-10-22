export const environment = {
  production: false,

  usersEndpointUri: 'assets/sample-data/test-users.json/', // http://localhost:8080/api/v1/roles ?
  sandboxDefsEndpointUri: 'assets/sample-data/test-sandbox-defs.json/',
  trainingDefsEndpointUri: 'http://localhost:8080/training-definitions/',
  trainingInstancesEndpointUri: 'http://localhost:8080/training-instances/',
  trainingRunsEndpointUri: 'http://localhost:8080/training-runs/',
  levelsEndpointUri: 'http://localhost:8080/levels/',

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

};
