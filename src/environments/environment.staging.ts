
export const baseURL = 'https://kypo-devel.ics.muni.cz';
export const homeURL = baseURL;
export const trainingURL = baseURL + ':8083/kypo2-rest-training/api/v1/';
export const sandboxesURL = baseURL + ':8080/kypo-sandbox-service/api/v1/';
export const userAngGroupURL = baseURL + ':8084/kypo2-rest-user-and-group/api/v1/';

export const kypo2TopologyConfig =  {
  topologyRestUrl: sandboxesURL,
  decoratorsRestUrl: '', // OBSOLETE
  defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
  useRealTime: false, // OBSOLETE
  useDecorators: false, // OBSOLETE
};

export const visualizationConfig = {
  trainingBasePath: trainingURL
};


export const environment = {
  production: true,
  defaultNotificationDuration: 5000, // 0 to display until user dismisses it

  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig,
    kypo2TopologyConfig
  },
  trainingApiConfig: {
    trainingBasePath: trainingURL
  },
  sandboxAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    kypo2TopologyConfig: kypo2TopologyConfig
  },
  sandboxApiConfig: {
    sandboxRestBasePath: sandboxesURL
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: userAngGroupURL,
    defaultPaginationSize: 10,
  },
  kypo2AuthConfig: {
    maxRetryAttempts: 3,
    guardMainPageRedirect: 'home',
    guardLoginPageRedirect: 'login',
    tokenInterceptorAllowedUrls: [
      baseURL
    ],
    userInfoRestUri: userAngGroupURL,
    providers: [
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000,
        oidcConfig: {
          issuer: 'https://oidc.muni.cz/oidc/',
          clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
          redirectUri: homeURL,
          scope: 'openid email profile',
          logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
          postLogoutRedirectUri: homeURL + '/logout-confirmed/',
          silentRefreshRedirectUri: homeURL + '/silent-refresh.html',
          clearHashAfterLogin: true
        },
      }
    ]
  }
};
