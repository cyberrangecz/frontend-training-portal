import {NG_ENV} from 'angular-server-side-configuration/ng-env';

export const baseURL = 'https://kypo.ics.muni.cz';
export const homeURL = baseURL;
export const trainingsURL = baseURL + ':8083/kypo2-rest-training/api/v1/';
export const sandboxesURL = baseURL + ':8080/kypo-sandbox-service/api/v1/';
export const userAngGroupURL = baseURL + ':8084/kypo2-rest-user-and-group/api/v1/';
export const environment = {
  production: NG_ENV.production,
  trainingRestBasePath: NG_ENV.trainingRestBasePath,
  sandboxRestBasePath: NG_ENV.sandboxRestBasePath,
  // BEHAVIOUR SETTINGS
  defaultAlertDuration: Number(NG_ENV.defaultAlertDuration), // 0 to display until user dismisses it
  defaultPaginationSize: Number(NG_ENV.defaultPaginationSize),
  organizerSummaryPollingPeriod: Number(NG_ENV.organizerSummaryPollingPeriod),
  apiPollingPeriod: Number(NG_ENV.apiPollingPeriod),
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
      baseURL
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
