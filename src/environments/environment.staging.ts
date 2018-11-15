export const environment = {
  production: false,

  trainingRestBasePath: 'http://localhost:8080/kypo2-rest-training/api/v1/',
  usersEndpointUri: 'http://localhost:3000/users/',
  sandboxDefsEndpointUri: 'http://localhost:3000/sandbox-definitions/',
  trainingDefsEndpointUri: 'http://localhost:8080/kypo2-rest-training/api/v1/training-definitions/',
  trainingInstancesEndpointUri: 'http://localhost:8080/kypo2-rest-training/api/v1/training-instances/',
  trainingRunsEndpointUri: 'http://localhost:8080/kypo2-rest-training/api/v1/training-runs/',
  levelsEndpointUri: 'http://localhost:8080/kypo2-rest-training/api/v1/levels/',

  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: '38537333-6c63-4f06-b19a-3c55d708e512', //'18cd6765-be1a-4de4-a6c0-6adf9b9882d1',

  // set the scope for the permissions the client should request
  scope: 'eduPersonEntitlement groupNames address phone openid profile email', //'openid profile email',

  sessionChecksEnabled: false,

};
