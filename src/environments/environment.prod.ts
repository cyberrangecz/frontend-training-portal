export const environment = {
  production: true,

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,


  // TRAINING REST API
  trainingRestBasePath: 'http://147.251.124.129:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxRestBasePath: 'http://147.251.124.129:8080/kypo2-django-openstack/api/v1/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'http://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  //OIDC
  // Url of the Identity Provider
  issuer: 'https://oidc.muni.cz/oidc/',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin,
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  // The SPA's id. The SPA is registered with this id at the config-server
  clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
  // set the scope for the permissions the client should request
  scope: 'openid profile email',
  sessionChecksEnabled: false,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'http://147.251.124.129:8085/kypo2-rest-topology/api/v1/sandboxes/',
  decoratorsRestUrl: '',
  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime: false,
  useDecorators: false,
};
