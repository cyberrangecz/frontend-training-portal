// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // BEHAVIOUR SETTING
  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // TRAINING REST API
  trainingRestBasePath: 'http://localhost:8083/kypo2-rest-training/api/v1/',
  trainingDefsEndpointUri:  'http://localhost:8083/kypo2-rest-training/api/v1/training-definitions/',
  trainingInstancesEndpointUri: 'http://localhost:8083/kypo2-rest-training/api/v1/training-instances/',
  trainingRunsEndpointUri:  'http://localhost:8083/kypo2-rest-training/api/v1/training-runs/',
  levelsEndpointUri:  'http://localhost:8083/kypo2-rest-training/api/v1/levels/',

  // SANDBOX REST API
  sandboxDefsEndpointUri: 'http://147.251.21.38:8443/kypo-openstack/api/v1/definitions/',
  poolsEndpointUri: 'http://147.251.21.38:8443/kypo-openstack/api/v1/pools/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'http://localhost:8084/kypo2-rest-user-and-group/api/v1/',

  // OIDC SETTINGS
  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  // The SPA's id. The SPA is registered with this id at the config-server
  clientId: '3693320b-6acb-442c-be51-86e18f574f9d', //'18cd6765-be1a-4de4-a6c0-6adf9b9882d1',
  // set the scope for the permissions the client should request
  scope: 'openid profile email',
  sessionChecksEnabled: false,

  // TOPOLOGY CONFIG
  topologyRestUrl: '/assets/sample-data/graph-test-data.json',
  sandboxName: '',
  scenarioRestUrl: '',
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
