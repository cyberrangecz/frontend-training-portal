import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ActiveUserService} from "./services/shared/active-user.service";
import {AuthGuard} from "./services/guards/auth-guard.service";
import {DesignerGuard} from "./services/guards/designer-guard.service";
import {OrganizerGuard} from "./services/guards/organizer-guard.service";
import {TraineeGuard} from "./services/guards/trainee-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./components/shared/shared.module";
import {TrainingDistractionFreeModeService} from "./services/shared/training-distraction-free-mode.service";
import {AuthInterceptor} from "./services/http-interceptors/auth-interceptor";
import {OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {UserFacadeModule} from "./services/facades/modules/user-facade.module";
import {AdminGuard} from './services/guards/admin-guard.service';
import {SandboxAllocationBarService} from './services/organizer/sandbox-allocation/sandbox-allocation-bar.service';
import {ErrorLogInterceptor} from './services/http-interceptors/error-log-interceptor';
import {NgxHotjarModule} from 'ngx-hotjar';
import {LogoutRedirectGuard} from "./services/guards/logout-redirect-guard.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    UserFacadeModule,
    NgxHotjarModule.forRoot('<script>\n' +
      '    (function(h,o,t,j,a,r){\n' +
      '        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n' +
      '        h._hjSettings={hjid:1315402,hjsv:6};\n' +
      '        a=o.getElementsByTagName(\'head\')[0];\n' +
      '        r=o.createElement(\'script\');r.async=1;\n' +
      '        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n' +
      '        a.appendChild(r);\n' +
      '    })(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');\n' +
      '</script>'),
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: [],
          sendAccessToken: true
        }
      })
  ],
  providers: [
    AuthGuard,
    DesignerGuard,
    OrganizerGuard,
    AdminGuard,
    TraineeGuard,
    LogoutRedirectGuard,
    ActiveUserService,
    TrainingDistractionFreeModeService,
    SandboxAllocationBarService,
    { provide: OAuthStorage, useValue: localStorage },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
