import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';

export const environment = {
  production: true,
  trainingRestBasePath: 'https://147.251.124.129:8083/kypo2-rest-training/api/v1/',
  sandboxRestBasePath: 'https://147.251.124.129:8081/kypo2-django-openstack/api/v1/',
  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,
  sandboxAllocationStateRefreshRate: 30000,
  kypo2TopologyConfig: {
    topologyRestUrl: 'https://147.251.124.129:8085/kypo2-rest-topology/api/v1/',
    decoratorsRestUrl: '',
    defaultDecoratorRefreshPeriodInSeconds: 3,
    useRealTime: false,
    useDecorators: false,
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: 'https://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/',
    defaultPaginationSize: 20,
  },
  kypo2AuthConfig: {
    maxRetryAttempts: 3,
    guardMainPageRedirect: 'home',
    guardLoginPageRedirect: 'login',
    tokenInterceptorAllowedUrls: [
      'https://147.251.124.129'
    ],
    userInfoRestUri: 'https://147.251.124.129:8084/kypo2-rest-user-and-group/api/v1/',
    providers: [
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        tokenRefreshTime: 30000,
        oidcConfig: {
          issuer: 'https://oidc.muni.cz/oidc/',
          clientId: 'b53f2660-8fa0-4d32-94e4-23a59d7e7077',
          redirectUri: 'https://147.251.124.129',
          scope: 'openid email profile',
          logoutUrl: 'https://oidc.muni.cz/oidc/endsession',
          postLogoutRedirectUri: 'https://147.251.124.129/login',
          clearHashAfterLogin: true
        },
      },
      {
        label: 'Login with KYPO',
        textColor: 'white',
        backgroundColor: 'red',
        tokenRefreshTime: 30000,
        oidcConfig: {
          issuer: 'http://147.251.124.129:8080/openid-connect-server-webapp/',
          clientId: '63c83f53-d747-4b1e-916f-90e9497c8b60',
          redirectUri: window.location.origin,
          scope: 'openid email profile',
          logoutUrl: 'http://147.251.124.129:8080/openid-connect-server-webapp/endsession',
          postLogoutRedirectUri: window.location.origin + '/login',
          clearHashAfterLogin: true,
          requireHttps: false
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
  hotjarTrackingCode: '<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:1315402,hjsv:6};a=o.getElementsByTagName(\'head\')[0];r=o.createElement(\'script\');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');</script>',
};
