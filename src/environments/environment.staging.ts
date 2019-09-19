import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';
export const baseURL = 'https://kypo-devel.ics.muni.cz';
export const homeURL = baseURL;
export const trainingsURL = baseURL + ':8083/kypo2-rest-training/api/v1/';
export const sandboxesURL = baseURL + ':8080/kypo2-django-openstack/api/v1/';
export const userAngGroupURL = baseURL + ':8084/kypo2-rest-user-and-group/api/v1/';
export const environment = {
  production: true,
  trainingRestBasePath: trainingsURL,
  sandboxRestBasePath: sandboxesURL,
  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,
  sandboxAllocationStateRefreshRate: 5000,
  kypo2TopologyConfig: {
    topologyRestUrl: sandboxesURL,
    decoratorsRestUrl: '',
    defaultDecoratorRefreshPeriodInSeconds: 3,
    useRealTime: false,
    useDecorators: false,
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: userAngGroupURL,
    defaultPaginationSize: 20,
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
          postLogoutRedirectUri: homeURL + '/login',
          clearHashAfterLogin: true
        },
      },
    ]
  },
  markdownConfig: {
    markdownParser: {
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      }
    },
    markdownEditor: {
      fileUploadRestUrl: ''
    }
  },
  hotjarTrackingCode: '1435968'
};
