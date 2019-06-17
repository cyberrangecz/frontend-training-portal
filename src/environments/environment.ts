// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // BEHAVIOUR SETTING
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,

  // TRAINING REST API
  trainingRestBasePath: 'http://147.251.124.129:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxRestBasePath: 'http://147.251.124.129:8080/kypo2-django-openstack/api/v1/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'http://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  //OIDC
  issuer: 'https://oidc.muni.cz/oidc/',
  clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
  redirectUri: window.location.origin,
  scope: 'openid profile email',
  logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
  postLogoutRedirectUri: window.location.origin,
  sessionChecksEnabled: true,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'http://147.251.124.129:8085/kypo2-rest-topology/api/v1/sandboxes/',
  decoratorsRestUrl: '',
  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime: false,
  useDecorators: false,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
