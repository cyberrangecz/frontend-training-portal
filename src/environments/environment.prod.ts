import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';

export const environment = {
  production: true,
  trainingRestBasePath: 'https://147.251.124.178:8083/kypo2-rest-training/api/v1/',
  sandboxRestBasePath: 'https://147.251.124.178:8080/kypo2-django-openstack/api/v1/',
  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 5000, // 0 to display until user dismisses it
  defaultPaginationSize: 5,
  defaultDelayToDisplayLoading: 500,
  defaultOrganizerTROverviewRefreshRate: 5000,
  sandboxAllocationStateRefreshRate: 30000,
  kypo2TopologyConfig: {
    topologyRestUrl: 'https://147.251.124.178:8085/kypo2-rest-topology/api/v1/',
    decoratorsRestUrl: '',
    defaultDecoratorRefreshPeriodInSeconds: 3,
    useRealTime: false,
    useDecorators: false,
  },
  kypo2UserAndGroupConfig: {
    userAndGroupRestBasePath: 'https://147.251.124.178:8084/kypo2-rest-user-and-group/api/v1/',
    defaultPaginationSize: 20,
  },
  kypo2AuthConfig: {
    maxRetryAttempts: 3,
    guardMainPageRedirect: 'home',
    guardLoginPageRedirect: 'login',
    userInfoRestUri: 'https://147.251.124.178:8084/kypo2-rest-user-and-group/api/v1/',
    tokenInterceptorAllowedUrls: [
      'https://147.251.124.178'
    ],
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
