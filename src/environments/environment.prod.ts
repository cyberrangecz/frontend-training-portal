export const environment = {
  production: true,
  rootPath: 'https://147.251.124.178',

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,


  // TRAINING REST API
  trainingRestBasePath: 'https://147.251.124.178:8083/kypo2-rest-training/api/v1/',

  // SANDBOX REST API
  sandboxRestBasePath: 'https://147.251.124.178:8080/kypo2-django-openstack/api/v1/',

  //USER AND GROUP API
  userAndGroupRestBasePath: 'https://147.251.124.178:8084/kypo2-rest-user-and-group/api/v1/',
  userAndGroupDefaultPaginationSize: 20,

  // TOPOLOGY COMPONENT CONFIG
  topologyRestUrl: 'https://147.251.124.178:8085/kypo2-rest-topology/api/v1/sandboxes/',
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
        clientId: '4fbfa660-88e9-4560-98ee-c858610e7946',
        redirectUri: 'https://147.251.124.178',
        scope: 'openid email profile',
        logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
        postLogoutRedirectUri: 'https://147.251.124.178/login',
        clearHashAfterLogin: true
      },
    ]
  }
};
