import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';

// Server url
export const baseURL = 'https://kypo-devel.ics.muni.cz';
// Frontend url
export const homeURL = 'https://localhost:4200';
// trainings service url
export const trainingsURL = baseURL + ':8083/kypo2-rest-training/api/v1/';
// sandboxes service url
export const sandboxesURL = baseURL + ':8080/kypo2-django-openstack/api/v1/';

// user and gorup service url
export const userAngGroupURL = baseURL + ':8084/kypo2-rest-user-and-group/api/v1/';

export const environment = {
  production: false,
  trainingRestBasePath: trainingsURL,
  sandboxRestBasePath: sandboxesURL,
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultOrganizerTROverviewRefreshRate: 5000, // api polling period in training instance detail page
  apiPollingPeriod: 5000, // api polling during sandbox allocation
  kypo2TopologyConfig: {
    topologyRestUrl: sandboxesURL,
    decoratorsRestUrl: '', // OBSOLETE
    defaultDecoratorRefreshPeriodInSeconds: 3, // OBSOLETE
    useRealTime: false, // OBSOLETE
    useDecorators: false, // OBSOLETE
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: userAngGroupURL,
    defaultPaginationSize: 20,
  },
  kypo2AuthConfig: {
    maxRetryAttempts: 3, // How many attempts to try to get user info from user and group service before emitting error
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    tokenInterceptorAllowedUrls: [ // all matching urls will have authorization token header
      baseURL
    ],
    userInfoRestUri: userAngGroupURL,
    providers: [ // OIDC providers
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000, // how often check if tokens are still valid
        oidcConfig: {
          issuer: 'https://oidc.muni.cz/oidc/',
          clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
          redirectUri: window.location.origin, // redirect after successful login
          scope: 'openid email profile',
          logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
          postLogoutRedirectUri: window.location.origin, // redirect after successful logout
          clearHashAfterLogin: true // remove token and other info from url after login
        },
      },
      {
        label: 'Login with CSIRT-MU',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000,
        oidcConfig: {
          issuer: 'https://kypo-devel.ics.muni.cz:8443/csirtmu-dummy-issuer-server/',
          clientId: '33a4ed17-d235-49f7-8ae5-e072e1dde2fc',
          redirectUri: homeURL,
          scope: 'openid email profile',
          logoutUrl: 'https://kypo-devel.ics.muni.cz:8443/csirtmu-dummy-issuer-server/endsession',
          postLogoutRedirectUri: 'https://kypo-devel.ics.muni.cz/',
          clearHashAfterLogin: true
        }
      }
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
  useHotjar: false,
  hotjarTrackingCode: '1436140'
};
