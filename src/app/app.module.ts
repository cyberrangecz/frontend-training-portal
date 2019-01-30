import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ActiveUserService} from "./services/active-user.service";
import {AuthGuard} from "./guards/auth-guard.service";
import {LoginGuard} from "./guards/login-guard.service";
import {DesignerGuard} from "./guards/designer-guard.service";
import {OrganizerGuard} from "./guards/organizer-guard.service";
import {TraineeGuard} from "./guards/trainee-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./components/shared/shared.module";
import {TrainingDistractionFreeModeService} from "./services/training-distraction-free-mode.service";
import {AuthInterceptor} from "./http-interceptors/auth-interceptor";
import {OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {ErrorLogInterceptor} from "./http-interceptors/error-log-interceptor";
import {UserFacadeModule} from "./services/facades/modules/user-facade.module";

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
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: [],
          sendAccessToken: true
        }
      })
  ],
  providers: [
    { provide: OAuthStorage, useValue: localStorage },
    AuthGuard,
    LoginGuard,
    DesignerGuard,
    OrganizerGuard,
    TraineeGuard,
    ActiveUserService,
    TrainingDistractionFreeModeService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
