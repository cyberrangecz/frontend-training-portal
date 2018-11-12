export const environment = {
  production: true,

  trainingRestBasePath: '',
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
  clientId: '18cd6765-be1a-4de4-a6c0-6adf9b9882d1',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  sessionChecksEnabled: false,

};
