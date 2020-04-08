import {NG_ENV} from 'angular-server-side-configuration/ng-env';

export const environment = {
  production: NG_ENV.production,
  // BEHAVIOUR SETTINGS
  defaultNotificationDuration: Number(NG_ENV.defaultAlertDuration), // 0 to display until user dismisses it

  trainingAgendaConfig: {
    pollingPeriod: 5000,
    defaultPaginationSize: 10,
    visualizationConfig: {
      trainingBasePath: NG_ENV.trainingRestBasePath
    },
    kypo2TopologyConfig: {
      topologyRestUrl: NG_ENV.topologyRestUrl,
      decoratorsRestUrl: NG_ENV.decoratorsRestUrl,
      defaultDecoratorRefreshPeriodInSeconds: Number(NG_ENV.defaultDecoratorRefreshPeriodInSeconds),
      useRealTime: Boolean(NG_ENV.useRealTime),
      useDecorators: Boolean(NG_ENV.useDecorators),
    },
  },

  trainingApiConfig: {
    trainingBasePath: NG_ENV.trainingRestBasePath
  },

  sandboxAgendaConfig: {
    pollingPeriod: Number(NG_ENV.pollingPeriod),
    defaultPaginationSize: Number(NG_ENV.defaultPaginationSize),
    kypo2TopologyConfig: {
      topologyRestUrl: NG_ENV.topologyRestUrl,
      decoratorsRestUrl: NG_ENV.decoratorsRestUrl,
      defaultDecoratorRefreshPeriodInSeconds: Number(NG_ENV.defaultDecoratorRefreshPeriodInSeconds),
      useRealTime: Boolean(NG_ENV.useRealTime),
      useDecorators: Boolean(NG_ENV.useDecorators),
    },
  },
  sandboxApiConfig: {
    sandboxRestBasePath: NG_ENV.sandboxRestBasePath
  },
  kypo2TopologyConfig: {
  topologyRestUrl: NG_ENV.topologyRestUrl,
    decoratorsRestUrl: NG_ENV.decoratorsRestUrl,
  defaultDecoratorRefreshPeriodInSeconds: Number(NG_ENV.defaultDecoratorRefreshPeriodInSeconds),
  useRealTime: Boolean(NG_ENV.useRealTime),
  useDecorators: Boolean(NG_ENV.useDecorators),
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: NG_ENV.userAndGroupRestBasePath,
    defaultPaginationSize: Number(NG_ENV.defaultPaginationSize),
  },
  kypo2AuthConfig: {
    maxRetryAttempts: Number(NG_ENV.maxRetryAttempts),
    guardMainPageRedirect: NG_ENV.guardMainPageRedirect,
    guardLoginPageRedirect: NG_ENV.guardLoginPageRedirect,
    userInfoRestUri: NG_ENV.userInfoRestUri,
    tokenInterceptorAllowedUrls: [
      NG_ENV.baseUrl
    ],
    providers: [
      {
        label: NG_ENV.label,
        textColor: NG_ENV.textColor,
        backgroundColor: NG_ENV.backgroundColor,
        tokenRefreshTime: Number(NG_ENV.tokenRefreshTime),
        oidcConfig: {
          issuer: NG_ENV.issuer,
          clientId: NG_ENV.clientId,
          redirectUri: NG_ENV.redirectUri,
          scope: NG_ENV.scope,
          logoutUrl: NG_ENV.logoutUrl,
          postLogoutRedirectUri: NG_ENV.postLogoutRedirectUri,
          silentRefreshRedirectUri: NG_ENV.silentRefreshRedirectUri,
          clearHashAfterLogin: Boolean(NG_ENV.clearHashAfterLogin)
        }
      }
    ]
  }
};
