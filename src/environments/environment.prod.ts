export const environment = {
  production: true,

  usersEndpointUri: '',
  sandboxDefsEndpointUri: '',
  trainingDefsEndpointUri: '',
  trainingInstancesEndpointUri: '',
  trainingRunsEndpointUri: '',
  levelsEndpointUri: '',

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
  requestWithAuthUri: 'http://localhost:8080/private'

};
