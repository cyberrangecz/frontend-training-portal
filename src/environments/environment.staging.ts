export const environment = {
  production: true,
  rootPath: 'https://147.251.124.129',

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,


  // TRAINING REST API
  trainingRestBasePath: 'https://147.251.124.129:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxRestBasePath: 'https://147.251.124.129:8080/kypo2-django-openstack/api/v1/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'https://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'https://147.251.124.129:8085/kypo2-rest-topology/api/v1/sandboxes/',
  decoratorsRestUrl: '',
  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime: false,
  useDecorators: false,

  kypo2AuthConfig: {
    maxRetryAttempts: 3,
    guardMainPageRedirect: 'home',
    guardLoginPageRedirect: 'login',
    userInfoRestUri: 'https://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/users/info',
    providers: [
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000,
        issuer: 'https://oidc.muni.cz/oidc/',
        clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
        redirectUri: 'https://147.251.124.129',
        scope: 'openid email profile',
        logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
        postLogoutRedirectUri: 'https://147.251.124.129/login',
        clearHashAfterLogin: true
      },
    ]
  }
};
