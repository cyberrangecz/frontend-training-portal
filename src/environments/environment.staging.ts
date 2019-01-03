
export const environment = {
  production: false,
  // REST API PATHS
  trainingRestBasePath: 'http://localhost:8080/kypo2-rest-training/api/v1/',
  usersEndpointUri: 'http://localhost:3000/users/',
  sandboxDefsEndpointUri: 'http://localhost:3000/sandbox-definitions/',
  trainingDefsEndpointUri:  this.trainingRestBasePath + 'training-definitions/',
  trainingInstancesEndpointUri: this.trainingRestBasePath +  + 'training-instances/',
  trainingRunsEndpointUri:  this.trainingRestBasePath + 'training-runs/',
  levelsEndpointUri:  this.trainingRestBasePath + 'levels/',

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // OIDC SETTINGS
  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: '18cd6765-be1a-4de4-a6c0-6adf9b9882d1',
  // set the scope for the permissions the client should request
  scope: 'openid profile email',
  sessionChecksEnabled: false,
};
