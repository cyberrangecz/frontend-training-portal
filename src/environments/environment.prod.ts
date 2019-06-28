export const environment = {
  production: true,
  rootPath: 'http://147.251.124.178',

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,


  // TRAINING REST API
  trainingRestBasePath: 'http://147.251.124.178:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxRestBasePath: 'http://147.251.124.178:8080/kypo2-django-openstack/api/v1/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'http://147.251.124.178:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  //OIDC
  issuer: 'https://oidc.muni.cz/oidc/',
  redirectUri: window.location.origin + '/',
  clientId: '4fbfa660-88e9-4560-98ee-c858610e7946',
  scope: 'openid profile email',
  logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
  postLogoutRedirectUri: window.location.origin,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'http://147.251.124.178:8085/kypo2-rest-topology/api/v1/sandboxes/',
  decoratorsRestUrl: '',
  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime: false,
  useDecorators: false,
};
