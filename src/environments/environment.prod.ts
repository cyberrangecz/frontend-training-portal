export const environment = {
  production: true,

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // TRAINING REST API
  trainingRestBasePath: 'http://147.251.21.216:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxDefsEndpointUri:  'http://147.251.21.216:8080/kypo-openstack/api/v1/definitions/',
  poolsEndpointUri: 'http://147.251.21.216:8080/kypo-openstack/api/v1/pools/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'http://147.251.21.216:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  //OIDC
  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin,
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  // The SPA's id. The SPA is registered with this id at the config-server
  clientId: '593bbf49-a82b-4f6e-9baf-c4ed488d5066',
  // set the scope for the permissions the client should request
  scope: 'openid profile email',
  sessionChecksEnabled: false,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'http://147.251.21.216:8085/kypo2-rest-topology/api/v1/sandboxes/',
  sandboxName: '',
  scenarioRestUrl: '',
  decoratorsRestUrl: '',
  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime: false,
  useDecorators: false,
};
