import {NG_ENV} from 'angular-server-side-configuration/ng-env';

export const kypo2TopologyConfig = {
    topologyRestUrl: NG_ENV.KYPO_SANDBOX_SERVICE_URL,
    decoratorsRestUrl: NG_ENV.KYPO_DECORATORS_SERVICE_URL ? NG_ENV.KYPO_DECORATORS_SERVICE_URL : '',
    defaultDecoratorRefreshPeriodInSeconds: NG_ENV.KYPO_DECORATORS_REFRESH_PERIOD_SECONDS ? Number(NG_ENV.KYPO_DECORATORS_REFRESH_PERIOD_SECONDS) : 3,
    useRealTime: NG_ENV.KYPO_TOPOLOGY_DECORATORS_USE_REAL_TIME ? Boolean(NG_ENV.KYPO_TOPOLOGY_DECORATORS_USE_REAL_TIME) : false,
    useDecorators: NG_ENV.KYPO_TOPOLOGY_USE_DECORATORS ? Boolean(NG_ENV.KYPO_TOPOLOGY_USE_DECORATORS) : false,
  };

export const environment = {
  production: true,
  defaultNotificationDuration: NG_ENV.KYPO_DEFAULT_NOTIFICATION_DURATION ? Number(NG_ENV.KYPO_DEFAULT_NOTIFICATION_DURATION) : 5000, // 0 to display until user dismisses it
  trainingAgendaConfig: {
    pollingPeriod: NG_ENV.KYPO_POLLING_PERIOD ? Number(NG_ENV.KYPO_POLLING_PERIOD) : 5000,
    defaultPaginationSize: NG_ENV.KYPO_PAGINATION_SIZE ? Number(NG_ENV.KYPO_PAGINATION_SIZE) : 10,
    visualizationConfig: {
      trainingBasePath: NG_ENV.KYPO_TRAINING_SERVICE_URL
    },
    kypo2TopologyConfig
  },
  trainingApiConfig: {
    trainingBasePath: NG_ENV.KYPO_TRAINING_SERVICE_URL
  },
  sandboxAgendaConfig: {
    pollingPeriod: NG_ENV.KYPO_POLLING_PERIOD ? Number(NG_ENV.KYPO_POLLING_PERIOD) : 5000,
    defaultPaginationSize: NG_ENV.KYPO_PAGINATION_SIZE ? Number(NG_ENV.KYPO_PAGINATION_SIZE) : 10,
    kypo2TopologyConfig
  },
  sandboxApiConfig: {
    sandboxRestBasePath: NG_ENV.KYPO_SANDBOX_SERVICE_URL
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: NG_ENV.KYPO_USER_AND_GROUP_SERVICE_URL,
    defaultPaginationSize: NG_ENV.KYPO_PAGINATION_SIZE ? Number(NG_ENV.KYPO_PAGINATION_SIZE) : 10,
  },
  kypo2AuthConfig: {
    maxRetryAttempts: NG_ENV.KYPO_AUTH_ATTEMPTS ? Number(NG_ENV.KYPO_AUTH_ATTEMPTS) : 3,
    guardMainPageRedirect: NG_ENV.KYPO_HOME_REDIRECT ? NG_ENV.KYPO_HOME_REDIRECT : 'home',
    guardLoginPageRedirect: NG_ENV.KYPO_LOGIN_REDIRECT ? NG_ENV.KYPO_LOGIN_REDIRECT : 'login',
    tokenInterceptorAllowedUrls: NG_ENV.KYPO_OIDC_TOKEN_WHITELIST ? NG_ENV.KYPO_OIDC_TOKEN_WHITELIST.split(',') : [],
    userInfoRestUri: NG_ENV.KYPO_USER_AND_GROUP_SERVICE_URL,
    providers: JSON.parse(NG_ENV.KYPO_OIDC_PROVIDERS)
  }
};
